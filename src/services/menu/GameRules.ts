class GameRules {
    public rulesItem: HTMLDivElement;

    constructor() {
        this.rulesItem = document.querySelector('.rules_container') as HTMLDivElement;
        this.setupEventListener();
    }

    public setupEventListener(): void {
        this.rulesItem.addEventListener('click', () => {
            const modal = document.querySelector('.modal') as HTMLDivElement;
            const rulesContainer = document.querySelector('.modal_rules_container') as HTMLDivElement;
        
            modal.classList.add('show');
            rulesContainer.classList.add('show');
        });
    }
}

export default GameRules;
