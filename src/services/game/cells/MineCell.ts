import Board from "../Board";
import CellInterface from "../../../core/cell/CellInterface";
import NumberCell from "./NumberCell";
import LoseResult from "../../result/loseResult";
import gameOver from "../../../helpers/gameOver";

class MineCell implements CellInterface {
    public cell: HTMLDivElement;
    private board: Board;
    public hasFlag: boolean = false;
    public isOpen: boolean = false;
    private index: number;
    private row: number;
    private col: number;

    constructor(board: Board, index: number) {
        this.cell = document.createElement('div');
        this.board = board;
        this.index = index;
        this.row = 0;
        this.col = 0;
    }

    public create(): void {
        this.cell.classList.add('mine');
        
        this.assignCoordinates();
        this.createMineImg();
        this.createFlagImg();
        this.createCrossImg();
    }

    private assignCoordinates(): void {
        this.row = Math.floor(this.index / this.board.stats.cols) + 1;
        this.col = this.index % this.board.stats.cols + 1;
    }

    private createMineImg(): void {
        const img = document.createElement('img');
        img.src = './assets/img/bomb-svgrepo-com.svg';
        img.style.visibility = 'hidden';
        img.classList.add('mine_svg');

        this.cell.append(img);
    }

    public surroundWithNumbers(): void {
        for (let i = this.row - 1; i <= this.row + 1; i++) {
            for (let j = this.col - 1; j <= this.col + 1; j++) {
   
                const index = (i - 1) * this.board.stats.cols + (j - 1);
                if (this.board.gameCells.get(`mine_${index}`) || this.board.gameCells.get(`number_${index}`)) {
                    continue;
                }
                
                if (i > 0 && i <= this.board.stats.rows && j > 0 && j <= this.board.stats.cols) {
                    const numberCell = new NumberCell(this.board, index);
                    numberCell.create();

                    const key = `number_${index}`;
                    numberCell.cell.setAttribute('data-key', key);

                    this.board.gameBoard[index] = numberCell;
                    this.board.gameCells.set(key, numberCell);
                }
            }
        }
    }

    public clickCell(): void {
        const img = this.cell.querySelector('.mine_svg') as HTMLImageElement;
        img.src = './assets/img/bomb-svgrepo-com-red.svg';
        
        img.addEventListener('load', () => {
            this.board.mines.forEach(mine => {
                mine.cell.style.backgroundColor = 'rgb(224 224 224)';

                if (!mine.hasFlag) {
                    const img = mine.cell.querySelector('.mine_svg') as HTMLImageElement;
                    img.style.visibility = 'visible';
                    this.isOpen = true;
                }
            });
            
            gameOver(new LoseResult);
        });
    }

    private createFlagImg(): void {
        const img = document.createElement('img');
        img.src = './assets/img/flag-2-svgrepo-com.svg';
        img.style.visibility = 'hidden';
        img.classList.add('flag_svg');

        this.cell.append(img);
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

    private createCrossImg(): void {
        const img = document.createElement('img');
        img.src = './assets/img/cross-svgrepo-com.svg';
        img.style.visibility = 'hidden';
        img.classList.add('cross_svg');
        
        this.cell.append(img);
    }
}

export default MineCell;
