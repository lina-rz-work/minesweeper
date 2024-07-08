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
                gameModeItem.style.height = '40px';

                gameModeItem.classList.add('unclicked');
                gameModeItem.addEventListener('animationend', () => {
                    gameModeItem.classList.remove('unclicked');
                });
            } else {
                gameModeItem.style.height = gameModeItem.scrollHeight + "px";
            }

            this.closeHintItem();
            this.clearSelectionMessage();
        });
    }

    private closeHintItem(): void {
        const hintItem = document.querySelector('.hint_container') as HTMLDivElement;
        if (hintItem.classList.contains('clicked')) {
            hintItem.style.height = '40px';

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



// с делегированием?
// class GameMode {
//     constructor() {
//         this.setupInteractions();
//     }
    
//     public setupInteractions() {
//         this.addModeItemBehavior();
//     }

//     private addModeItemBehavior(): void {
//         const modeContainer = document.querySelector('.mode_container') as HTMLDivElement;

//         modeContainer.addEventListener('click', e => {
//             const clickedElement = e.target as HTMLElement;

//             if (clickedElement.classList.contains('mode_title')) {
//                 this.handleModeTitleClick();
//             }

//             if (clickedElement instanceof HTMLLIElement) {
//                 this.handleModeListItemClick(clickedElement);
//             }
//         });
//     }

//     private handleModeTitleClick(): void {
//         this.closeHintContainer();
//         this.toggleModeList();
//         this.clearSelectionMessage();
//     }

//     private closeHintContainer(): void {
//         const hintContainer = document.querySelector('.hint_container') as HTMLDivElement;
//         if (hintContainer.classList.contains('clicked')) {
//             hintContainer.classList.remove('clicked');
//         }
//     }

//     private toggleModeList(): void {
//         const modeContainer = document.querySelector('.mode_container') as HTMLDivElement;
//         modeContainer.classList.toggle('clicked');
//         if (!modeContainer.classList.contains('clicked')) {
//             modeContainer.classList.add('unclicked');
//             modeContainer.addEventListener('animationend', () => {
//                 modeContainer.classList.remove('unclicked');
//             })
//             return;
//         }
//         modeContainer.classList.remove('unclicked');
//     }

//     private clearSelectionMessage(): void {
//         const message = document.querySelector('.select_option_message') as HTMLDivElement;
//         message.innerHTML = '';
//     }

//     private handleModeListItemClick(clickedMode: HTMLLIElement): void {
//         const modeList = clickedMode.closest('.mode_list') as HTMLDivElement;
//         const selectedMode = clickedMode.getAttribute('data-mode') as string;
//         modeList.setAttribute('data-selected-mode', selectedMode);
        
//         const modeTitle = document.querySelector('.mode_title') as HTMLDivElement;
//         modeTitle.innerHTML = clickedMode.innerHTML;

//         this.closeHintContainer();
//         this.toggleModeList();
//         this.clearSelectionMessage();
//     }
// }

// export default GameMode;


