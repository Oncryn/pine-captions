// types for typescript

interface Translation {
    translation: string;
    original: string;
}

interface CaptionSettings {
    speechToTextService: "otter" | "deepgram";
    key: string;
    language: "ja" | "zh-cn" | "zh-Hans";
    translator: "google" | "bing" | "libre";
    style: "closed" | "fullscreen";
    saveSettings: boolean;
}

interface Window {
    electron: {
        openCaptions: (captionSettings: CaptionSettings) => void;
        transcriptAvaliable: (transcript: string) => void;
        sendAudio: (audioArrayBuffer: ArrayBuffer) => void;
    };
}