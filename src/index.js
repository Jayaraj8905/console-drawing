// HIGH LEVEL TASKS

// 1. PROMPTER - https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts
// 2. VALIDATION HANDLER
// 3. CANVAS BOARD
// 4. LINE
// 5. RECTANGLE
// 6. FILL - FLOOD FILL ALGORITHM
// 7. CANVAS DRAWING

// https://medium.com/@hiteshkrsahu/using-es6-in-node-js-server-eba548f013b3
// https://michele.io/nodemon-babel-vscode/

import inquirer from  'inquirer';
import { Canvas } from './canvas';
class Interaction {

    #COMMANDS = {
        QUIT: /^Q$/,
        CANVAS: /^C (\d+?) (\d+?)$/,
        LINE: /^L (\d+?) (\d+?) (\d+?) (\d+?)$/,
        RECTANGLE: /^R (\d+?) (\d+?) (\d+?) (\d+?)$/,
        BUCKET: /^B (\d+?) (\d+?) ([a-zA-z])$/
    }

    #VALIDATIONMSGS = {
        CANVASDIMENSIONS: 'Canvas width and height should not be 0',
        INVALIDCOMMAND: 'Invalid Command!',
        NOTINBOUND: 'Coordinates are not inbound!',
        NOCANVAS: 'No Canvas found. Create canvas first!',
        INVALIDPARAMS: 'Invalid Coordinates!'
    }
    constructor() {}

    /**
     * Validate the command and do the appropriate action
     * in the canvvas
     * @param {string} command 
     */
    validateAndHandle(command = '') {
        if (this.isQuit(command)) {
            process.exit();
        }
        // Handle for canvas data
        let data = this.handleCanvasData(command);
        if (data) {
            this.canvas = new Canvas(data.w, data.h);
            if (!this.canvas.board) {
                this.canvas = null; // Reset the canvas instance
                console.log(this.#VALIDATIONMSGS.CANVASDIMENSIONS);
                return;
            }
            this.canvas.draw();
            return;
        }
        // For all other cases, canvas should be created, else throw the error
        if (!this.canvas) {
            console.log(this.#VALIDATIONMSGS.NOCANVAS);
            return false;
        }

        // Handle for line
        data = this.handleLineData(command);
        if(data) {
            if (!this.canvas.isInBound(data.x1, data.y1) || !this.canvas.isInBound(data.x2, data.y2)) {
                console.log(this.#VALIDATIONMSGS.NOTINBOUND);
                return;
            }
            if (!this.canvas.addLine(data.x1, data.y1, data.x2, data.y2)) {
                console.log(this.#VALIDATIONMSGS.INVALIDPARAMS);
                return;
            }
            this.canvas.draw();
            return;
        }
        // Handle for Rectangle
        data = this.handleRectangleData(command);
        if (data) {
            if (!this.canvas.isInBound(data.x1, data.y1) || !this.canvas.isInBound(data.x2, data.y2)) {
                console.log(this.#VALIDATIONMSGS.NOTINBOUND);
                return;
            }
            if (!this.canvas.addRectangle(data.x1, data.y1, data.x2, data.y2)) {
                console.log(this.#VALIDATIONMSGS.INVALIDPARAMS);
                return;
            }
            this.canvas.draw();
            return;
        }
        // Handle for bucket fill
        data = this.handleBucket(command);
        if (data) {
            if (!this.canvas.isInBound(data.x, data.y)) {
                console.log(this.#VALIDATIONMSGS.NOTINBOUND);
                return;
            }
            this.canvas.fill(data.x, data.y, data.c);
            this.canvas.draw();
            return;
        }

        console.log(this.#VALIDATIONMSGS.INVALIDCOMMAND);
    }
    /**
     * Validate the command if it matches for quit
     * @param {string} command 
     */
    isQuit(command) {
        const match = command.match(this.#COMMANDS.QUIT);
        return match;
    }
    /**
     * Validate the command if it matches for canvas
     * and parse the data
     * @param {string} command 
     */
    handleCanvasData(command) {
        const match = command.match(this.#COMMANDS.CANVAS);
        if (match && match.length === 3) {
            return {
                w: Number(match[1]),
                h: Number(match[2])
            }
        }
        return false;
    }
    /**
     * Validate the command if it matches for Line
     * and parse the data
     * @param {string} command 
     */
    handleLineData(command) {
        const match = command.match(this.#COMMANDS.LINE);
        if (match && match.length === 5) {
            return {
                x1: Number(match[1]),
                y1: Number(match[2]),
                x2: Number(match[3]),
                y2: Number(match[4])
            }
        }
        return false;
    }
    /**
     * Validate the command if it matches for Rectangle
     * and parse the data
     * @param {string} command
     */
    handleRectangleData(command) {
        const match = command.match(this.#COMMANDS.RECTANGLE);
        if (match && match.length === 5) {
            return {
                x1: Number(match[1]),
                y1: Number(match[2]),
                x2: Number(match[3]),
                y2: Number(match[4])
            }
        }
        return false;
    }
    /**
     * Validate the command if it matches for bucket fill
     * and parse the data
     * @param {*} command 
     */
    handleBucket(command) {
        const match = command.match(this.#COMMANDS.BUCKET);
        if (match && match.length === 4) {
            return {
                x: Number(match[1]),
                y: Number(match[2]),
                c: match[3].toString()
            }
        }
        return false;
    }

    /**
     * Show the promp message
     */
    prompt() {
        // this.validateAndHandle('C 10 4');
        inquirer.prompt([{
                name: 'commands',
                message: 'enter command:',
            }]).then(data => {
                this.validateAndHandle(data.commands);
                this.prompt();
        });
    }
}

const interaction = new Interaction();
interaction.prompt();