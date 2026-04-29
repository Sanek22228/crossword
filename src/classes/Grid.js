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
        console.log(this.grid);
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

    trimGrid(){
        console.log(`start: height: ${this.height}, width: ${this.width}`);
        console.log("grid: \n");
        console.log(this.grid);
        this.grid = this.grid.filter(r => {
            return r.some(c => (c !== '0'))
            }
        )
        let prevHeight = this.height;
        this.height = this.grid.length;
        console.log(`after filter: height: ${this.height}, width: ${this.width}`);
        console.log("grid: \n");
        console.log(this.grid);
        
        let cols = Array.from(
            {length : this.width},
            () => {return Array(this.height).fill('0')}
        );
        
        for (let i = 0; i < this.height; i++){
            let row = this.grid[i];
            for (let j = 0; j < this.width; j ++){
                cols[j].push(row[j]);
            }
        }
        let emptyColsIndexes = [];
        for (let i = 0; i < cols.length; i++){
            if(cols[i].every(item => item === '0'))
                emptyColsIndexes.push(i);
        }
        if(emptyColsIndexes.reverse()){  
            for(let i = 0; i < this.grid.length; i++){
                emptyColsIndexes.forEach(ind => {
                    this.grid[i].splice(ind,1);
                })
            }    
        }
        let prevWidth = this.width;
        this.width = this.grid[0].length;
        return [prevHeight - this.height, prevWidth - this.width];
    }
}