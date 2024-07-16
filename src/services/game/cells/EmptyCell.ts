import Board from "../Board";
import CellInterface from "../../../core/cell/CellInterface";
import checkWinner from "../../../helpers/checkWinner";
import MineCell from "./MineCell";

class EmptyCell implements CellInterface {
    public cell: HTMLDivElement;
    private board: Board;
    public hasFlag: boolean = false;
    public isOpen: boolean = false;
    private index: number;
    private row: number;
    private col: number;

    constructor(game: Board, index: number) {
        this.cell = document.createElement('div');
        this.board = game;
        this.index = index;
        this.row = 0;
        this.col = 0;
    }

    create() {
        this.cell.classList.add('empty_cell');

        this.assignCoordinates();
        this.createFlagImg();
    }

    private assignCoordinates() {
        this.row = Math.floor(this.index / this.board.stats.cols) + 1;
        this.col = this.index % this.board.stats.cols + 1;
    }

    private createFlagImg(): void {
        const img = document.createElement('img');
        img.src = './assets/img/flag-2-svgrepo-com.svg';
        img.style.visibility = 'hidden';
        img.classList.add('flag_svg');

        this.cell.append(img);
    }

    public clickCell(): void {
        if (this.hasFlag) {
            this.removeFlag();
        }

        if (this.isOpen) {
            return;
        }
        this.openEmptyCell();
        
        for (let i = this.row - 1; i <= this.row + 1; i++) {
            for (let j = this.col - 1; j <= this.col + 1; j++) {

                const index = (i - 1) * this.board.stats.cols + (j - 1);
                if (i > 0 && i <= this.board.stats.rows && j > 0 && j <= this.board.stats.cols) {
                    const cell = this.board.gameBoard[index];

                    if (!(cell instanceof MineCell) && !cell.isOpen) {
                        cell.clickCell();
                    }
                }
            }
        }
    }

    private openEmptyCell(): void {
        const parentElem = this.cell.parentElement as HTMLElement;
        parentElem.classList.add('unhovered');
        this.cell.style.backgroundColor = 'rgb(224 224 224)';
        
        this.isOpen = true;
        ++this.board.stats.openedCells;
        checkWinner(this.board.stats);
    }

    public toggleFlag(): void {
        const img = this.cell.querySelector('.flag_svg') as HTMLImageElement;
        if (img.style.visibility == 'hidden' && this.board.stats.flags < this.board.stats.mines) {
            this.addFlag();
            return;
        }
        
        if (img.style.visibility == 'visible') {
            this.removeFlag();
        }
    }
    
    private addFlag(): void {
        const img = this.cell.querySelector('.flag_svg') as HTMLImageElement;
        img.style.visibility = 'visible';
        this.board.stats.flags++;
        this.hasFlag = true;
    }
    
    private removeFlag(): void {
        const img = this.cell.querySelector('.flag_svg') as HTMLImageElement;
        img.style.visibility = 'hidden';
        this.board.stats.flags--;
        this.hasFlag = false;
    }
}

export default EmptyCell;

