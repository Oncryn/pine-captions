import { BrowserWindow, app, ipcMain } from "electron";
import { EventEmitter } from "events";
import { deepgramInstance } from "./js/deepgram";
import { otterInstance } from "./js/otter";
import { Deepgram } from "@deepgram/sdk";
import { translate } from "./js/translate.js";
import { spawnCaptions } from "./js/spawnCaptions";

app.on("ready", async () => {
    const selectionWindow = new BrowserWindow({
        icon: `${__dirname}/assets/icon.png`,
        autoHideMenuBar: true,
        webPreferences: {
            preload: `${__dirname}/client/selection/preload.js`
        }
    });
    // create a new electron window with the selection menu
    // starts a preload script which exposes the api

    await selectionWindow.loadFile(`${__dirname}/client/selection/index.html`);
    // opens the menu selection html file. requests will be sent to the preload api

    ipcMain.on("openCaptions", async (_event, captionSettings: CaptionSettings) => {
        selectionWindow.close(); // close the selection window

        let captionWindow = await spawnCaptions(captionSettings.style); // spawn the captions with the style
        let eventEmitter: EventEmitter; // create a new variable with the type of event emitter

        if (captionSettings.speechToTextService === "deepgram") {
            eventEmitter = deepgramInstance(captionSettings.key); // open a new deepgram websocket & invisible window capturing audio
        } else {
            await otterInstance(captionSettings.key); // or create a otter instance
            // the otter instance is an invisible electron window
            // the otter instance will load the otter url and continuously scrape the last html elemenet - the speech to text result
        
            eventEmitter = new EventEmitter(); // create an event emitter for the otter window
        }

        ipcMain.on("transcriptAvaliable", (_event, transcript: string) => { // if the otter window sends a transcript
            eventEmitter.emit("transcriptReceived", transcript); // emit it as an event that way it can be handled without repeating code
            // (deepgram + otter can be handled in one event)
        });

        eventEmitter.on("transcriptReceived", async transcript => {
            if (captionSettings.speechToTextService === "deepgram") {
                transcript = JSON.parse(transcript).channel.alternatives[0].transcript; // let transcript be the first alternative/selection
            }

            if (transcript) {
                // translate it using the selected translator
                let translation = await translate(transcript, captionSettings.translator, captionSettings.language);
                // create an object/structure with the translated and original transcript 
                const translationObject: Translation = {
                    translation: translation,
                    original: transcript
                };
                // send the transcript to the captions window
                captionWindow.webContents.send("translationAvailable", translationObject);
            }
        });
        
        // if audio is avaliable from the invisible window, it sends it to the deepgram api.
        ipcMain.on("audioAvailable", (_event, audioArrayBuffer: ArrayBuffer) => {
            if ((eventEmitter as ReturnType<Deepgram["transcription"]["live"]>).getReadyState() === 1) {
                // as ReturnType<Deepgram...> is required as usual event emitters do not have the getReadyState and send function
                (eventEmitter as ReturnType<Deepgram["transcription"]["live"]>).send(audioArrayBuffer);
            }
        });
    });
});

/**
 * TODO (in ~never): implement save/persist setting - currently an option in the UI but not avaliable
 * implement official translate APIs with API keys - this way it doesn't get ratelimited from the "free api (aka reverse engineered free version)"
 * fullscreen style cc
 */