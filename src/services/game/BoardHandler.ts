import Board from "./Board";
import Timer from "../timer/Timer";

class BoardHandler {
    private static instance: BoardHandler;
    private board: Board;
    private timer: Timer;
    private timerOn: boolean = false;

    private constructor() {
        this.board = new Board(0, 0, 0);
        this.timer = new Timer();
    }

    public static getInstance(): BoardHandler {
        if (!BoardHandler.instance) {
            BoardHandler.instance = new BoardHandler();
        }

        return BoardHandler.instance;
    }

    public addClickHandler(board: Board, timer: Timer): void {
        this.board = board;
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
        
        const cellElem = closest.firstElementChild as HTMLDivElement;
        const key = cellElem.getAttribute('data-key');
        if (!key) {
            return;
        }

        if (!this.timerOn) {
            this.startTimer();
        }
        
        const cell = this.board.gameCells.get(key);
        if (!cell?.hasFlag) {
            cell?.clickCell();
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

        const cellElem = closest.firstElementChild as HTMLDivElement;
        const key = cellElem.getAttribute('data-key');
        if (!key) {
            return;
        }

        const cell = this.board.gameCells.get(key);
        if (!cell?.isOpen) {
            cell?.toggleFlag();
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
        flagNum.innerHTML = `${this.board.stats.mines - this.board.stats.flags}`;
    }
}

export default BoardHandler;
