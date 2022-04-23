export class Canvas {
    #PAINT = {
        xBorder: '-',
        yBorder: '|',
        line: 'x',
        empty: ' '
    }
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.board = []; // [y,x]
        this.createBoard();
    }
    /**
     * Create the board with the board and empty data
     */
    createBoard() {
        this.board = new Array(this.height + 2);
        for(let y=0; y<this.board.length; y++) {
            // If y index is 0 or last, then fill with x border paint
            if (y === 0 || y === this.height + 1) {
                this.board[y] = new Array(this.width + 2).fill(this.#PAINT.xBorder);
            } else {
                this.board[y] = new Array(this.width + 2).fill(this.#PAINT.empty);
                this.board[y][0] = this.#PAINT.yBorder;
                this.board[y][this.width + 1] = this.#PAINT.yBorder;
            }
        }
    }
    /**
     * Add the horizontal or vertical line based on the coordinates
     * @param {string} x1 
     * @param {string} y1 
     * @param {string} x2 
     * @param {string} y2 
     */
    addLine(x1, y1, x2, y2) {
        // If horizontal line, paint the board with line data
        if (y1 === y2) {
            if (x1 > x2) {
                // swap x1 and x2, in case it is right to left
                const tmp = x1;
                x1 = x2;
                x2 = tmp;
            }
            this.board[y1].fill(this.#PAINT.line, x1, x2 + 1);
            return true;
            
        } else if (x1 === x2) {
            // For vertical line, iterate and paint the board with line data
            if (y1 > y2) {
                // swap y1 and y2, in case it is bottom to top
                const tmp = y1;
                y1 = y2;
                y2 = tmp;
            }
            for (let y = y1; y <= y2; y++) {
                this.board[y][x1] = this.#PAINT.line; 
            }
            return true;
        }
        return false;
    }
    /**
     * Add the rectangle based on the params
     * If the coordinates are in the same line, it will draw the line
     * @param {string} x1 
     * @param {string} y1 
     * @param {string} x2 
     * @param {string} y2 
     */
    addRectangle(x1, y1, x2, y2) {
        // To form a rectangle, the difference between x1, x2 and y1, y2 should be greater than 1
        if (Math.abs(x1 - x2) <= 1 || Math.abs(y1 - y2) <= 1) {
            return false;
        }
        return this.addLine(x1, y1, x2, y1)
                && this.addLine(x1, y1, x1, y2)
                && this.addLine(x1, y2, x2, y2)
                && this.addLine(x2, y1, x2, y2);
    }
    /**
     * Blood Fill algorithm to fill the array based on the bounds
     * @param {number} x 
     * @param {number} y 
     * @param {number} c 
     */
    fill(x, y, c) {
        if (this.board[y][x] !== this.#PAINT.empty) {
            return true;
        }
        this.board[y][x] = c;
        // fill left
        this.fill(x-1, y, c);
        // fill top
        this.fill(x, y-1, c);
        // fill right
        this.fill(x+1, y, c); 
        // fill bottom
        this.fill(x, y+1, c);
        return true;
    }
    /**
     * Check, if the x and y coordinates are inbound
     * @param {number} x 
     * @param {number} y 
     */
    isInBound(x, y) {
        return x > 0 && x <= this.width && y > 0 && y <= this.height;
    }
    /**
     * Draw the canvas based on the data in the board
     */
    draw() {
        for(let y=0; y<this.board.length; y++) {
            console.log(this.board[y].join(''));
        }
    }
}