const DEFAULT_SIZE = 15;
export const MAX_SIZE = 25;

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
        if(rows > MAX_SIZE || cols > MAX_SIZE) return false;

        while(this.height < rows){
            this.height++;
            this.grid.push(Array(this.width).fill('0'))
        }
        while(this.width < cols){
            this.width++;    
            for(let i = 0; i < this.height; i++){
                this.grid[i].push('0');
            }
        }
        return true;
    }

    expandTop(count){
        if (this.height + count > MAX_SIZE) return false;
        for(let i = 0; i < count; i++){
            this.grid.unshift(Array(this.width).fill('0'));
            this.height++;
        }
        return true;
    }

    expandLeft(count){
        if (this.width + count > MAX_SIZE) return false;
        for (let row of this.grid){
            for (let i = 0; i < count; i++){
                row.unshift('0');
            }
        }
        this.width += count;
        return true;
    }

    clearGrid(){
        this.grid = Array.from(
            {length : this.height},
            () => {return Array(this.width).fill('0')}
        );
    }
}