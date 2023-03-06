import { BrowserWindow, screen } from "electron";

export async function spawnCaptions(style: CaptionSettings["style"]) {
    const { width, height } = screen.getPrimaryDisplay().size;

    const captionWindow = new BrowserWindow({
        width: 800,
        height: 150,
        x: width / 2 - 800 / 2,
        y: height - 200,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        focusable: false,
        webPreferences: {
            preload: `${__dirname}/../client/captions/preload.js`
        }
    });

    captionWindow.setIgnoreMouseEvents(true);

    switch (style) {
        case "closed":
            await captionWindow.loadFile(`${__dirname}/../client/captions/closed.html`);
            break;
        case "fullscreen":
            await captionWindow.loadFile(`${__dirname}/../client/captions/fullscreen.html`);
    }

    return captionWindow;
}