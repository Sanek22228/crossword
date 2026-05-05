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
        // перебираем каждую ячейку в поисках крайних координат
        let minRow = this.height, minCol = this.width;
        let maxRow = 0, maxCol = 0;
        for (let r = 0; r < this.grid.length; r++){
            for (let c = 0; c < this.grid[0].length; c++){
                if(this.grid[r][c] !== '0'){
                    if(r < minRow) minRow = r;
                    if(c < minCol) minCol = c;

                    if(r > maxRow) maxRow = r;
                    if(c > maxCol) maxCol = c;
                }
            }
        }

        // обрезаем grid по крайним координатам
        this.grid = this.grid.slice(minRow, maxRow+1)
            .map(r => r.slice(minCol, maxCol+1));
        this.height = this.grid.length;
        this.width = this.grid[0].length;

        return [minRow, minCol];
    }
}