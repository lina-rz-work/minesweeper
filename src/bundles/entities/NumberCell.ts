import Game3 from "../game/Game3";
import EntityInterface from "./EntityInterface";
import checkWinner from "../helpers/checkWinner";

class NumberCell implements EntityInterface {
    public cell: HTMLDivElement;
    public hasFlag: boolean = false;
    public isOpen: boolean = false;
    private game: Game3;
    private index: number;
    private row: number;
    private col: number;

    constructor(game: Game3, index: number) {
        this.cell = document.createElement('div');
        this.game = game;
        this.index = index;
        this.row = 0;
        this.col = 0;
    }

    public create(): void {
        this.cell.classList.add('number');

        this.assignCoordinates();
        this.createNumElem();
        this.createFlagImg();
    }

    private assignCoordinates(): void {
        this.row = Math.floor(this.index / this.game.stats.cols) + 1;
        this.col = this.index % this.game.stats.cols + 1;
    }

    private createNumElem(): void {
        if (this.cell.innerHTML) {
            return;
        }
        const minesAround = this.minesAround();

        const span = document.createElement('span'); 
        span.style.visibility = 'hidden';
        span.innerHTML = `${minesAround}`;
        span.style.color = 'rgb(80 65 43)';
        this.cell.append(span);
    }

    private minesAround(): number {
        let minesAround = 0;

        for (let i = this.row - 1; i <= this.row + 1; i++) {
            for (let j = this.col - 1; j <= this.col + 1; j++) {

                const index = (i - 1) * this.game.stats.cols + (j - 1);        
                if (!this.game.gameEntites.get(`mine_${index}`)) {
                    continue;
                }

                if (i > 0 && i <= this.game.stats.rows && j > 0 && j <= this.game.stats.cols) {
                    minesAround += 1;
                }
            }
        }

        return minesAround;
    }
    
    public clickCell(): void {
        if (this.hasFlag) {
            this.removeFlag();
        }

        if (this.isOpen) {
            return;
        }
        
        const span = this.cell.firstChild as HTMLSpanElement;
        span.style.visibility = 'visible';
        this.cell.style.backgroundColor = 'rgb(224 224 224)';
        
        this.isOpen = true;
        ++this.game.stats.openedCells;
        checkWinner(this.game.stats);
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
        if (img.style.visibility == 'hidden' && this.game.stats.flags < this.game.stats.mines) {
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
        this.game.stats.flags++;
        this.hasFlag = true;
    }
    
    private removeFlag(): void {
        const img = this.cell.querySelector('.flag_svg') as HTMLImageElement;
        img.style.visibility = 'hidden';
        this.game.stats.flags--;
        this.hasFlag = false;
    }
}

export default NumberCell;

