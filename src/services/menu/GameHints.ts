class GameHints {
    
    constructor() {
        this.setupEventListeners();
    }
    
    public setupEventListeners() {
        this.addHintItemBehavior();
        this.addHintsBehavior();
    }

    private addHintItemBehavior(): void {
        const hintItem = document.querySelector('.hint_container') as HTMLDivElement;

        hintItem.addEventListener('click', () => {
            hintItem.classList.toggle('clicked');
            if (!hintItem.classList.contains('clicked')) {
                hintItem.classList.add('unclicked');
                hintItem.addEventListener('animationend', () => {
                    hintItem.classList.remove('unclicked');
                });
            }

            this.clearSelectionMessage();
        });
    }

    private clearSelectionMessage(): void {
        const message = document.querySelector('.select_option_message') as HTMLDivElement;
        message.innerHTML = '';
    }

    private addHintsBehavior(): void {
        const hintTitle = document.querySelector('.hint_title') as HTMLDivElement;
        const hintList = document.querySelector('.hint_list') as HTMLUListElement;
        const hints = [...hintList.querySelectorAll('li')] as HTMLLIElement[];
        hints.forEach(hint => {
            hint.addEventListener('click', () => {
                const selectedHint = hint.getAttribute('data-hint') as string;
                hintList.setAttribute('data-selected-hint', selectedHint);
                hintTitle.innerHTML = hint.innerHTML;
            });
        });
    }
}

export default GameHints;
