import { Deepgram } from "@deepgram/sdk";
import { BrowserWindow } from "electron";

export function deepgramInstance(key: string) {
    const audioRecorderWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: `${__dirname}/../client/recorder/preload.js`
        }
    });

    audioRecorderWindow.loadFile(`${__dirname}/../client/recorder/index.html`)

    const deepgram = new Deepgram(key);
    const deepgramWebSocket = deepgram.transcription.live({ punctuate: true, times: false });
    return deepgramWebSocket;
}