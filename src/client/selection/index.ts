const form = document.querySelector<HTMLFormElement>("#form");

form.addEventListener("submit", e => {
    e.preventDefault();

    const speechToTextService = document.querySelector<HTMLSelectElement>("#speechToTextService").value;
    const key = document.querySelector<HTMLInputElement>("#key").value;
    const language = document.querySelector<HTMLInputElement>("#language").value;
    const translator = document.querySelector<HTMLSelectElement>("#translator").value;
    const style = document.querySelector<HTMLSelectElement>("#style").value;
    const saveSettings = document.querySelector<HTMLInputElement>("#saveSettings").checked;

    window.electron.openCaptions({
        speechToTextService: speechToTextService as CaptionSettings["speechToTextService"],
        key: key,
        language: language as CaptionSettings["language"],
        translator: translator as CaptionSettings["translator"],
        style: style as CaptionSettings["style"],
        saveSettings: saveSettings
    });
});
