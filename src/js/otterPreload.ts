import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    transcriptAvaliable: (transcript: string) => ipcRenderer.send("transcriptAvaliable", transcript)
});