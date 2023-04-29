const GRIDE_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
    #cells

  constructor(gridElement) {
    gridElement.style.setProperty("--grid-size", GRIDE_SIZE);
    gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    this.#cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement,
        index % GRIDE_SIZE,
        Math.floor(index / GRIDE_SIZE)
      );
    });
  }

  get #emptyCells() {
    return this.#cells.filter(cell => cell.tile == null )
  }
  randomEmptyCell() {
    const randonIndex = Math.floor(Math.random() * this.#emptyCells.length)
    return this.#emptyCells[randonIndex]
  }
}

class Cell {
    #cellElement
    #x
    #y
    #tile

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get tile() {
    return this.#tile
  }

  set tile(value) {
    this.#tile = value
    if (value == null) return
    this.#tile.x = this.#x
    this.#tile.y = this.#y
  }
}

function createCellElements(gridElement) {
  const cells = [];
  for (let i = 0; i < GRIDE_SIZE * GRIDE_SIZE; i++) {
    const cell = document.createElement("div");
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}
