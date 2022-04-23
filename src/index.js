// HIGH LEVEL TASKS

// 1. PROMPTER - https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts
// 2. VALIDATION HANDLER
// 3. CANVAS BOARD
// 4. RECTANGLE
// 5. SQUARE
// 6. FILL - FLOOD FILL ALGORITHM
// 7. CANVAS DRAWING

// https://medium.com/@hiteshkrsahu/using-es6-in-node-js-server-eba548f013b3
// https://michele.io/nodemon-babel-vscode/

import inquirer from  'inquirer';
class Interaction {

    constructor() {
        this.prompt();
    }

    /**
     * Prompt and validate the user input
     */
    prompt() {
        inquirer.prompt([{
                type: 'input',
                name: 'command',
                message: 'Enter command:'
            }]).then(answers => {
                console.log('\n');
                console.log(answers);
        });
    }
} 

new Interaction();

