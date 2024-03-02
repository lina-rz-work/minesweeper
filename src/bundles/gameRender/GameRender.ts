import Game3 from "../game/Game3";
import createBoard from "../helpers/createBoard";

class GameRender {
    public game: Game3;
    public gameBoard: HTMLDivElement;

    constructor(game: Game3) {
        this.game = game;
        this.gameBoard = createBoard(this.game.stats.rows, this.game.stats.cols);
    }

    public create() {
        this.renderFlagIndicator();
        this.renderGameBoard();
        this.renderEntites();
    }

    private renderFlagIndicator() {
        const flagNum = document.querySelector('.flag_number') as HTMLDivElement;
        flagNum.innerHTML = `${this.game.stats.mines}`;
    }

    private renderGameBoard(): void {
        const boardGameContainer = document.querySelector('.board_game_container') as HTMLDivElement;
        boardGameContainer.append(this.gameBoard);
    }

    private renderEntites(): void {
        const cells = Array.from(this.gameBoard.querySelectorAll('.cell'));

        for (let i = 0; i < cells.length; i++) {
            cells[i].append(this.game.gameBoard[i].cell);
        }
    }
}

export default GameRender;

