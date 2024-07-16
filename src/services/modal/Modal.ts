class Modal {
    public modal: HTMLDivElement;

    constructor() {
        this.modal = document.querySelector('.modal') as HTMLDivElement;
        this.setupEventListeners();
    }

    public setupEventListeners(): void {
        this.setupCloseBehavior();
    }

    private setupCloseBehavior(): void {
        this.modal.addEventListener('click', e => {
            const eventTarget = e.target as HTMLDivElement;
    
            if (eventTarget.classList.contains('modal')) {
                eventTarget.classList.remove('show');

                const openedElem = eventTarget.querySelector('.show');
                if (openedElem?.classList.contains('modal_result_container')) {
                    this.clearResultContainer();
                }
                if (openedElem?.classList.contains('modal_rules_container')) {
                    this.closeRulesContainer();
                } 
            }
        });
    }

    private clearResultContainer(): void {
        const resultContainer = document.querySelector('.modal_result_container') as HTMLDivElement;
        resultContainer.classList.remove('show');
        setTimeout(() => {
            resultContainer.innerHTML = '';
        }, 200);
    }
    
    private closeRulesContainer() {
        const rulesContainer = document.querySelector('.modal_rules_container') as HTMLDivElement;
        rulesContainer.classList.remove('show');
    }
}

export default Modal;

