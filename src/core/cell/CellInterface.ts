interface CellInterface {
    cell: HTMLDivElement;
    hasFlag: boolean;
    isOpen: boolean;
    clickCell(): void;
    toggleFlag(): void;
}

export default CellInterface;
