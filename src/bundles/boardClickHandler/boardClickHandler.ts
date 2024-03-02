import Game3 from "../game/Game3";
import Timer from "../timer/Timer";

class BoardClickHandler {
    private static instance: BoardClickHandler;
    private game: Game3;
    private timer: Timer;
    private timerOn: boolean = false;

    private constructor() {
        this.game = new Game3(0, 0, 0);
        this.timer = new Timer();
    }

    public static getInstance(): BoardClickHandler {
        if (!BoardClickHandler.instance) {
            BoardClickHandler.instance = new BoardClickHandler();
        }

        return BoardClickHandler.instance;
    }

    public addClickHandler(game: Game3, timer: Timer): void {
        this.game = game;
        this.timer = timer;

        const gameBoard = document.querySelector('.game_board') as HTMLDivElement;
        gameBoard.addEventListener('click', this.leftClick);
        gameBoard.addEventListener('contextmenu', this.rightClick);
    }
    
    public removeClickHandler(): void {
        const gameBoard = document.querySelector('.game_board') as HTMLDivElement;
        gameBoard.removeEventListener('click', this.leftClick);
        gameBoard.removeEventListener('contextmenu', this.rightClick);
        
        if (this.timerOn) {
            this.stopTimer();
        }
    }

    private leftClick = (e: Event) => {
        const clickedElement = e.target as HTMLElement;
        const closest = clickedElement.closest('.cell');
        if (!closest) {
            return;
        }
        
        const entityCell = closest.firstElementChild as HTMLDivElement;
        const key = entityCell.getAttribute('data-key');
        if (!key) {
            return;
        }

        if (!this.timerOn) {
            this.startTimer();
        }
        
        const entity = this.game.gameEntites.get(key);
        if (!entity?.hasFlag) {
            entity?.clickCell();
            this.updateFlagIndicator();
        }
    }

    private rightClick = (e: Event) => {
        e.preventDefault();
        const clickedElement = e.target as HTMLElement;
        const closest = clickedElement.closest('.cell');
        if (!closest) {
            return;
        }

        const entityCell = closest.firstElementChild as HTMLDivElement;
        const key = entityCell.getAttribute('data-key');
        if (!key) {
            return;
        }

        const entity = this.game.gameEntites.get(key);
        if (!entity?.isOpen) {
            entity?.toggleFlag();
            this.updateFlagIndicator();
        }

        if (!this.timerOn) {
            this.startTimer();
        }
    }

    public stopTimer(): void {
        this.timer.stopTimer();
        this.timerOn = false;
    }

    public startTimer(): void {
        this.timer.startTimer();
        this.timerOn = true;
    }

    private updateFlagIndicator(): void {   
        const flagNum = document.querySelector('.flag_number') as HTMLDivElement;
        flagNum.innerHTML = `${this.game.stats.mines - this.game.stats.flags}`;
    }

}

export default BoardClickHandler;