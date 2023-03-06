async function sendAudio() {
    const media = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(media, {
        mimeType: "audio/webm"
    });

    mediaRecorder.addEventListener("dataavailable", async event => {
        window.electron.sendAudio(await event.data.arrayBuffer());
    });

    mediaRecorder.start(1000);
}

sendAudio();