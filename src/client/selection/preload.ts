import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    openCaptions: (captionSettings: CaptionSettings) => ipcRenderer.send("openCaptions", captionSettings)
});