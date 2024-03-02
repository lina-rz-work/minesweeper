import Game3 from "../game/Game3";
import EntityInterface from "./EntityInterface";
import NumberCell from "./NumberCell";
import LoseResult from "../result/loseResult";
import gameOver from "../helpers/gameOver";

class MineCell implements EntityInterface {
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
        this.cell.classList.add('mine');
        this.assignCoordinates();
        this.createMineImg();
        this.createFlagImg();
        this.createCrossImg();
    }

    private assignCoordinates(): void {
        this.row = Math.floor(this.index / this.game.stats.cols) + 1;
        this.col = this.index % this.game.stats.cols + 1;
    }

    private createMineImg(): void {
        const img = document.createElement('img');
        img.src = '../public/assets/img/bomb-svgrepo-com.svg';
        // img.src = '../public/assets/img/burst.svg';
        img.style.visibility = 'hidden';
        img.classList.add('mine_svg');

        this.cell.append(img);
    }

    public surroundWithNumbers(): void {
        for (let i = this.row - 1; i <= this.row + 1; i++) {
            for (let j = this.col - 1; j <= this.col + 1; j++) {
   
                const index = (i - 1) * this.game.stats.cols + (j - 1);
                if (this.game.gameEntites.get(`mine_${index}`) || this.game.gameEntites.get(`number_${index}`)) {
                    continue;
                }
                
                if (i > 0 && i <= this.game.stats.rows && j > 0 && j <= this.game.stats.cols) {
                    const numberCell = new NumberCell(this.game, index);
                    numberCell.create();

                    const key = `number_${index}`;
                    numberCell.cell.setAttribute('data-key', key);

                    this.game.gameBoard[index] = numberCell;
                    this.game.gameEntites.set(key, numberCell);
                }
            }
        }
    }

    public clickCell(): void {
        const img = this.cell.querySelector('.mine_svg') as HTMLImageElement;
        img.src = '../public/assets/img/bomb-svgrepo-com-red.svg';
        
        img.addEventListener('load', () => {
            this.game.mines.forEach(mine => {
                mine.cell.style.backgroundColor = 'rgb(224 224 224)';

                if (!mine.hasFlag) {
                    const img = mine.cell.querySelector('.mine_svg') as HTMLImageElement;
                    img.style.visibility = 'visible';
                    this.isOpen = true;
                }
            });
            
            gameOver(new LoseResult);
        });

        // img.addEventListener('load', () => {
        //     const allMines = Array.from(document.querySelectorAll('.mine')) as HTMLDivElement[];
        //     allMines.forEach(mine => {
        //         mine.style.backgroundColor = 'rgb(224 224 224)';

        //         const key = mine.getAttribute('data-key') as  string;
        //         const entity = this.game.gameEntites.get(key);
        //         if (!entity?.hasFlag) {
        //             const img = mine.querySelector('.mine_svg') as HTMLImageElement;
        //             img.style.visibility = 'visible';
        //             this.isOpen = true;
        //         }
        //     });
            
        //     gameOver(new LoseResult);
        // });
    }

    private createFlagImg(): void {
        const img = document.createElement('img');
        img.src = '../public/assets/img/flag-2-svgrepo-com.svg';
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

    private createCrossImg(): void {
        const img = document.createElement('img');
        img.src = '../public/assets/img/cross-svgrepo-com.svg';
        img.style.visibility = 'hidden';
        img.classList.add('cross_svg');
        
        this.cell.append(img);
    }
}

export default MineCell;

