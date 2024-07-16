import Board from "./Board";
import Render from "../render/Render";
import BoardHandler from "./BoardHandler";
import HintHandler from "../hint/Hint";
import Timer from "../timer/Timer";
import NewGame from "./Restart";

class Game {

    public create(rows: number, cols: number, mines: number): void {
        const board = new Board(rows, cols, mines);
        board.create();
    
        const render = new Render(board);
        render.create();
    
        const timer = new Timer();
    
        const boardHandler = BoardHandler.getInstance();
        boardHandler.addClickHandler(board, timer);
    
        const hintHandler = new HintHandler();

        const newGameBtn = new NewGame();
        
        this.showGame();
    }

    private showGame(): void {
        const homePage = document.querySelector('.home_page') as HTMLDivElement;
        const gameContainer = document.querySelector('.game_container') as HTMLDivElement;
        homePage.style.display = 'none';
        gameContainer.style.display = 'flex';
    }
}

export default Game;
