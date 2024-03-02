import BoardClickHandler from "../boardClickHandler/boardClickHandler";

class NewGame {
    public newGameBtn: HTMLDivElement;

    constructor() {
        this.newGameBtn = document.querySelector('.new_game_btn') as HTMLDivElement;

        this.setupEventListener();
    }

    private setupEventListener(): void {
        this.newGameBtn.addEventListener('click', () => {
            this.resetTimer();
            this.clearBoard();
            this.showHomePage();
        });
    }
    
    private resetTimer(): void {
        const boardClickHandler = BoardClickHandler.getInstance();
        boardClickHandler.stopTimer();

        const timer = document.querySelector('.time') as HTMLDivElement;
        timer.innerHTML = `00:00`;
    }
    
    private clearBoard(): void {
        const boardGameContainer = document.querySelector('.board_game_container') as HTMLDivElement;
        boardGameContainer.innerHTML = '';
    }
    
    private showHomePage(): void {
        const homePage = document.querySelector('.home_page') as HTMLDivElement;
        const gameContainer = document.querySelector('.game_container') as HTMLDivElement;
        homePage.style.display = 'block';
        gameContainer.style.display = 'none';
    
        const menuBlocks = [...document.querySelectorAll('.menu_block')] as HTMLDivElement[];
        const greeting = document.querySelector('.greeting') as HTMLDivElement;
        greeting.classList.remove(('fade_out'));
        menuBlocks.forEach((block) => {
            block.classList.remove('fade_out');
        });
    }
}

export default NewGame;

