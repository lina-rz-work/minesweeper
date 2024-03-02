import Game3 from "./game/Game3";
import GameRender from "./gameRender/GameRender";
import BoardClickHandler from "./boardClickHandler/boardClickHandler";
import HintHandler from "./hintHandler/hintHandler";
import Timer from "./timer/Timer";
import NewGame from "./newGame/newGame";

class MinesweeperGame {

    public create(rows: number, cols: number, mines: number): void {
        const game = new Game3(rows, cols, mines);
        game.create();
    
        const gameRender = new GameRender(game);
        gameRender.create();
    
        const timer = new Timer();
    
        const boardClickHandler = BoardClickHandler.getInstance();
        boardClickHandler.addClickHandler(game, timer);
    
        const hintHandler = new HintHandler();

        const newGameBtn = new NewGame();
        
        this.showGameBoard();
    }

    private showGameBoard(): void {
        const homePage = document.querySelector('.home_page') as HTMLDivElement;
        const gameContainer = document.querySelector('.game_container') as HTMLDivElement;
        homePage.style.display = 'none';
        gameContainer.style.display = 'flex';
    }
}

export default MinesweeperGame;

