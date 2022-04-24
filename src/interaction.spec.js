import { Canvas } from './canvas';
import { Interaction } from './interaction'; 
// https://jestjs.io/docs/en/es6-class-mocks
describe('Validation Messages', () => {
    const originalLog = console.log;
    afterEach(() => (console.log = originalLog));
    describe('Console.log check for validation messages', () => {
        let consoleOutput = [];
        const mockedLog = output => consoleOutput.push(output);
        beforeEach(() => (console.log = mockedLog));

        // TODO: EXPECT THE DRAW SHOULD NOT CALL
        test('Console log should be `No Canvas found. Create canvas first!` if we are inputting without creating the canvas', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('A B C');
            expect(consoleOutput).toEqual([
                'No Canvas found. Create canvas first!'
            ]); 
        });
        // TODO: EXPECT THE DRAW SHOULD NOT CALL
        test('Console log should be `Invalid Command!` if we are providing invalid commands', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.canvas = new Canvas(10, 4);
            interaction.validateAndHandle('A B C');
            expect(consoleOutput).toEqual([
                'Invalid Command!'
            ]); 
        });
        // TODO: EXPECT THE DRAW SHOULD NOT CALL
        test('Console log should be `Canvas width and height should not be 0!` if we are providing dimensions with zero values', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 0 4');
            expect(consoleOutput).toEqual([
                'Canvas width and height should not be 0!'
            ]); 
        });
        // TODO: EXPECT THE DRAW SHOULD NOT CALL
        test('Console log should be `Canvas width and height should not be 0!` if we are providing dimensions with zero values', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 0 4');
            expect(consoleOutput).toEqual([
                'Canvas width and height should not be 0!'
            ]); 
        });
        // TODO: INVALID DIMENSIONS FOR LINE
        // TODO: INBOUND FOR LINE

        // TODO: INVALID DIMENSIONS FOR RECTANGLE
        // TODO: INBOUND FOR RECTANGLE

        // TODO: INBOUND FOR FILL

        // TODO: PROMPT CONSOLE LOG CHECK


        
        
    });
});
