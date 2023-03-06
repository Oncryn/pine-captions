import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
    const translationElement = document.querySelector(".translation");
    const originalElement = document.querySelector(".original");

    ipcRenderer.on("translationAvailable", (_event, translation: Translation) => {
        translationElement.innerHTML = translation.translation;
        originalElement.innerHTML = translation.original;
    });
});