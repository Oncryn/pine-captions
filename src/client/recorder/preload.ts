import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    sendAudio: (audioArrayBuffer: ArrayBuffer) => ipcRenderer.send("audioAvailable", audioArrayBuffer)
});