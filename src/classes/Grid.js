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

    expandTop(count){
        for(let i = 0; i < count; i++){
            this.grid.unshift(Array(this.width).fill('0'));
            this.height++;
        }
    }

    expandLeft(count){
        for (let row of this.grid){
            for (let i = 0; i < count; i++){
                row.unshift('0');
            }
        }
        this.width += count;
    }

    clearGrid(){
        this.grid = Array.from(
            {length : this.height},
            () => {return Array(this.width).fill('0')}
        );
    }
}