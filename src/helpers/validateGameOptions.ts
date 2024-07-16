function validateGameOptions(): boolean {
    const modeList = document.querySelector('.mode_list') as HTMLDivElement;
    const selectedMode = modeList.getAttribute('data-selected-mode') as string;

    const hintList = document.querySelector('.hint_list') as HTMLDivElement;
    const selectedHint = hintList.getAttribute('data-selected-hint') as string;

    const message = document.querySelector('.select_option_message') as HTMLDivElement;

    if (!selectedMode && !selectedHint) {
        message.innerHTML = '* Please select a game mode and a hint mode.';
        return false;
    }

    if (!selectedMode) {
        message.innerHTML = '* Please select a game mode';
        return false;
    }

    if (!selectedHint) {
        message.innerHTML = '* Please select a hint mode';
        return false;
    }

    return true;
}

export default validateGameOptions;

