import * as googleTranslate from "@vitalets/google-translate-api";
import * as bingTranslate from "bing-translate-api";

export async function translate(text: string, translator: CaptionSettings["translator"], language: CaptionSettings["language"]) {
    let result: string;

    if (translator === "bing") {
        if (language === "zh-cn") language = "zh-Hans";
        result = (await bingTranslate.translate(text, null, language)).translation
    } else if (translator === "google") {
        result = (await googleTranslate.translate(text, {
            to: language
        })).text;
    } else if (translator === "libre") {
        const res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "en",
                target: language
            }),
            headers: { "Content-Type": "application/json" }
        });
        
        const json = await res.json();
        result = json.translatedText;
    }

    return result;
}