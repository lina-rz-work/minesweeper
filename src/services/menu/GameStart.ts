import Game from "../game/Game";
import validateGameOptions from "../../helpers/validateGameOptions";

class GameStart {   
    public startGameItem: HTMLDivElement;

    constructor() {
        this.startGameItem = document.querySelector('.start_container') as HTMLDivElement;
        this.setupEventListener();
    }

    setupEventListener(): void {
        this.startGameItem.addEventListener('click', () => {
            const modeSelected = validateGameOptions();
            if (!modeSelected) {
                return;
            }
            this.closeMenu();
        
            setTimeout(() => {
                this.startGame();
            }, 800);
        });
    }

    private closeMenu(): void {
        const greeting = document.querySelector('.greeting') as HTMLDivElement;
        greeting.classList.add('fade_out');
        
        const menuBlocks = [...document.querySelectorAll('.menu_block')] as HTMLDivElement[];
        menuBlocks.forEach((block) => {
            block.classList.add('fade_out');
        });
    }

    private startGame(): void {
        this.setHintMode();
        this.setGameMode(); 
    }

    private setHintMode(): void {
        const hintList = document.querySelector('.hint_list') as HTMLDivElement;
        const selectedHint = hintList.getAttribute('data-selected-hint') as string;
    
        if (selectedHint === 'hints_on') {
            const eyeButton = document.querySelector('.eye_button') as HTMLButtonElement;
            eyeButton.disabled = false;
        }
    
        if (selectedHint === 'hints_off') {
            const eyeButton = document.querySelector('.eye_button') as HTMLButtonElement;
            eyeButton.disabled = true;
        }
    }
    
    private setGameMode(): void {
        const playSpace = document.getElementById('playspace') as HTMLDivElement;
        const modeList = document.querySelector('.mode_list') as HTMLDivElement;
        const selectedMode = modeList.getAttribute('data-selected-mode') as string;
        
        if (selectedMode === 'easy_mode') {
            const newGame = new Game();
            newGame.create(9, 9, 10);
    
            playSpace.style.paddingTop = '70px';
        }
        
        if (selectedMode === 'medium_mode') {
            const newGame = new Game();
            newGame.create(15, 15, 40);
    
            playSpace.style.paddingTop = '60px';
        }
    
        if (selectedMode === 'hard_mode') {
            const newGame = new Game();
            newGame.create(20, 30, 99);
    
            playSpace.style.paddingTop = '15px';
        }
    }
}

export default GameStart;
