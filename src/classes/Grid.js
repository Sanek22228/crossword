const DEFAULT_SIZE = 15;

export class Grid{
    height = DEFAULT_SIZE;
    width = DEFAULT_SIZE;
    grid = [];

    constructor() {
        this.grid = Array(this.height).map(()=>{Array(this.width).fill('0')})
        this.displayGrid();
    }
    
    displayGrid() {
        for (let row of this.grid){
            for (let cell of row)
                console.log(cell, " | ");
        }
    }

    expandGrid(rows, cols){
        if(rows > 0){
            for (let i = 0; i < rows; i++){
                this.grid.push(Array(this.width).map(()=>{Array(this.width).fill('0')}))
            }
            this.height += rows;
        }
        if(cols > 0){
            for(let i = 0; i < rows; i++){
                this.grid[i].push('0');
            }
            this.width += cols;
        }
    }
}