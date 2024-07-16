import Board from "../game/Board";
import createBoard from "../../helpers/createBoard";

class GameRender {
    public board: Board;
    public boardElement: HTMLDivElement;

    constructor(board: Board) {
        this.board = board;
        this.boardElement = createBoard(this.board.stats.rows, this.board.stats.cols);
    }

    public create() {
        this.renderFlagIndicator();
        this.renderGameBoard();
    }

    private renderFlagIndicator() {
        const flagNum = document.querySelector('.flag_number') as HTMLDivElement;
        flagNum.innerHTML = `${this.board.stats.mines}`;
    }

    private renderGameBoard(): void {
        const boardGameContainer = document.querySelector('.board_game_container') as HTMLDivElement;
        boardGameContainer.append(this.boardElement);
        
        this.renderCells();
    }

    private renderCells(): void {
        const cells = Array.from(this.boardElement.querySelectorAll('.cell'));

        for (let i = 0; i < cells.length; i++) {
            cells[i].append(this.board.gameBoard[i].cell);
        }
    }
}

export default GameRender;
