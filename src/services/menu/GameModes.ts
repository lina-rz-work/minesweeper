class GameModes {
    
    constructor() {
        this.setupEventListeners();
    }
    
    public setupEventListeners() {
        this.addModeItemBehavior();
        this.addModesBehavior();
    }

    private addModeItemBehavior(): void {
        const gameModeItem = document.querySelector('.mode_container') as HTMLDivElement;

        gameModeItem.addEventListener('click', () => {
            gameModeItem.classList.toggle('clicked');
            if (!gameModeItem.classList.contains('clicked')) {
                gameModeItem.classList.add('unclicked');
                gameModeItem.addEventListener('animationend', () => {
                    gameModeItem.classList.remove('unclicked');
                });
            }

            this.closeHintItem();
            this.clearSelectionMessage();
        });
    }

    private closeHintItem(): void {
        const hintItem = document.querySelector('.hint_container') as HTMLDivElement;
        if (hintItem.classList.contains('clicked')) {
            hintItem.classList.remove('clicked');
            hintItem.classList.add('unclicked');
            hintItem.addEventListener('animationend', () => {
                hintItem.classList.remove('unclicked');
            });
        }
    }

    private clearSelectionMessage(): void {
        const message = document.querySelector('.select_option_message') as HTMLDivElement;
        message.innerHTML = '';
    }

    private addModesBehavior(): void {
        const modeTitle = document.querySelector('.mode_title') as HTMLDivElement;
        const modeList = document.querySelector('.mode_list') as HTMLUListElement;
        const modes = [...modeList.querySelectorAll('li')] as HTMLLIElement[];
        modes.forEach(mode => {
            mode.addEventListener('click', () => {
                const selectedMode = mode.getAttribute('data-mode') as string;
                modeList.setAttribute('data-selected-mode', selectedMode);
                modeTitle.innerHTML = mode.innerHTML;
            });
        });
    }
}

export default GameModes;
