import { BrowserWindow } from "electron";

function sendTranscript() {
    let lastTranscript: string;
    
    setInterval(() => {
        const transcriptElements = [...document.querySelectorAll(".transcript-snippet__content-container")];
        const lastTranscriptElement = transcriptElements[transcriptElements.length - 1] as HTMLDivElement;
        const transcript = lastTranscriptElement.innerText;
        
        if (transcript !== lastTranscript) {
            window.electron.transcriptAvaliable(transcript);
            lastTranscript = transcript;
        }
    }, 2000);
}

export async function otterInstance(url: string) {
    const otterWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: `${__dirname}/otterPreload.js`
        }
    });

    await otterWindow.loadURL(url);
    otterWindow.webContents.executeJavaScript(sendTranscript.toString() + "sendTranscript()");
}