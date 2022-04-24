import { Canvas } from './canvas';
import { Interaction } from './interaction'; 
// https://jestjs.io/docs/en/es6-class-mocks
describe('Interaction', () => {
    const originalLog = console.log;
    afterEach(() => (console.log = originalLog));
    describe('Console.log check for validation messages', () => {
        let consoleOutput = [];
        const mockedLog = output => consoleOutput.push(output);
        beforeEach(() => (console.log = mockedLog));

        const mockDraw = jest.fn();
        Canvas.prototype.draw = mockDraw;
        beforeEach(() => (mockDraw.mockClear()));

        test('Console log should be `No Canvas found. Create canvas first!` if we are inputting without creating the canvas', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('A B C');
            expect(consoleOutput).toEqual([
                'No Canvas found. Create canvas first!'
            ]); 
        });
        test('Console log should be `Invalid Command!` if we are providing invalid commands and canvas draw method should not be called', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.canvas = new Canvas(10, 4);
            interaction.validateAndHandle('A B C');
            expect(consoleOutput).toEqual([
                'Invalid Command!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(0);
        });
        test('Console log should be `Canvas width and height should not be 0!` if we are providing dimensions with zero values and canvas draw method should not be called', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 0 4');
            expect(consoleOutput).toEqual([
                'Canvas width and height should not be 0!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(0);
        });
        test('Console log should be `Canvas width and height should not be 0!` if we are providing dimensions with zero values and canvas draw method should not be called', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 0 4');
            expect(consoleOutput).toEqual([
                'Canvas width and height should not be 0!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(0);
        });
        test('Console log should be `Coordinates are not inbound!` if we are providing dimensions for line which is not inbound with canvas and canvas draw method should be called only for board creation', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 10 4');
            interaction.validateAndHandle('L 1 4 12 4');
            interaction.validateAndHandle('L 1 5 9 5');
            expect(consoleOutput).toEqual([
                'Coordinates are not inbound!',
                'Coordinates are not inbound!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(1);
        });

        test('Console log should be `Invalid Coordinates!` if we are providing dimensions for line which is invalid for the line and canvas draw method should be called only for board creation', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 10 4');
            interaction.validateAndHandle('L 1 3 10 4');
            expect(consoleOutput).toEqual([
                'Invalid Coordinates!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(1);
        });

        test('Console log should be `Coordinates are not inbound!` if we are providing dimensions for rectangle which is not inbound with canvas and canvas draw method should be called only for board creation', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 10 4');
            interaction.validateAndHandle('R 1 2 12 4');
            interaction.validateAndHandle('R 1 2 9 5');
            expect(consoleOutput).toEqual([
                'Coordinates are not inbound!',
                'Coordinates are not inbound!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(1);
        });

        test('Console log should be `Invalid Coordinates!` if we are providing dimensions for rectangle which is invalid for the rectangle and canvas draw method should be called only for board creation', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 10 4');
            interaction.validateAndHandle('R 1 2 5 3');
            expect(consoleOutput).toEqual([
                'Invalid Coordinates!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(1);
        });

        test('Console log should be `Coordinates are not inbound!` if we are providing dimensions for fill which is not inbound with canvas and canvas draw method should be called only for board creation', () => {
            consoleOutput = [];
            const interaction = new Interaction();
            interaction.validateAndHandle('C 10 4');
            interaction.validateAndHandle('B 12 5 c');
            expect(consoleOutput).toEqual([
                'Coordinates are not inbound!'
            ]); 
            expect(mockDraw).toHaveBeenCalledTimes(1);
        });
    });
});
