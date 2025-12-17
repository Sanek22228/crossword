const DEFAULT_SIZE = 15;

export class Grid{
    height = DEFAULT_SIZE;
    width = DEFAULT_SIZE;
    grid = [];

    constructor() {
        this.grid = Array.from(
            {length : this.height},
            () => {return Array(this.width).fill('0')}
        );
    }
    
    displayGrid() {
        for (let row of this.grid){
            for (let cell of row)
                console.log(`grid[${this.grid.indexOf(row)}][${row.indexOf(cell)}] : `);
            console.log(row);
        }
    }

    expandGrid(rows, cols){
        while(this.height < rows){
            this.grid.push(Array(this.width).fill('0'))
            this.height++;
        }
        while(this.width < cols){
            for(let i = 0; i < this.height; i++){
                this.grid[i].push('0');
            }
            this.width++;
        }
    }

    clearGrid(){
        this.height = DEFAULT_SIZE;
        this.width = DEFAULT_SIZE;
        this.grid = Array.from(
            {length : this.height},
            () => {return Array(this.width).fill('0')}
        );
    }
}