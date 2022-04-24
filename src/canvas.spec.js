import { Canvas } from './canvas'; 
describe('Create canvas', () => {
    test('Canvas board should be not created if width or height is 0', () => {
        const canvas1 = new Canvas(0, 10);
        expect(!!canvas1.board).toBe(false);

        const canvas2 = new Canvas(10, 0);
        expect(!!canvas2.board).toBe(false);
    });
    test('Canvas board length should be not +2 of width and height', () => {
        const canvas1 = new Canvas(10, 4);
        expect(canvas1.board.length).toBe(6);
        expect(canvas1.board[0].length).toBe(12);
    });

    // Canvas board values should be - & |
    test('Canvas board should have a horizontal border - and vertical border |', () => {
        const canvas = new Canvas(10, 4);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected));
    });

    test('IsInBound should return true if the coordinates are within the canvas bound', () => {
        const canvas = new Canvas(10, 4);
        const isInBound = canvas.isInBound(2, 4);
        expect(isInBound).toEqual(true);
    });

    test('IsInBound should return false if the coordinates are not within the canvas bound', () => {
        const canvas = new Canvas(10, 4);
        const isInBoundY = canvas.isInBound(2, 8);
        expect(isInBoundY).toEqual(false);
        const isInBoundX = canvas.isInBound(12, 3);
        expect(isInBoundY).toEqual(false);
        const isInBoundXY = canvas.isInBound(12, 5);
        expect(isInBoundY).toEqual(false);
    });
});

describe('Create Line', () => {
    test('Line should not drawn if both of the coordinate pair are not same', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addLine(1, 2, 4, 3);
        expect(state).toEqual(false);
    });

    test('Horizontal Line should drawn if y coordinate is same', () => {
        const canvas = new Canvas(10, 4);
        canvas.addLine(1, 2, 6, 2);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected));
    });

    test('Vertical Line should drawn if x coordinate is same', () => {
        const canvas = new Canvas(10, 4);
        canvas.addLine(2, 1, 2, 4);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ','x',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ','x',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ','x',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ','x',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected));
    });
    
});

describe('Create Rectangle', () => {
    test('Rectangle should not drawn if x coordinate is same in both pair', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(1, 2, 1, 6);
        expect(state).toEqual(false);
    });

    test('Rectangle should not drawn if y coordinate is same in both pair', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(1, 2, 5, 2);
        expect(state).toEqual(false);
    });

    test('Rectangle should not drawn if difference between x1 and x2 is not greater than 1', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(1, 2, 2, 4);
        expect(state).toEqual(false);
    });

    test('Rectangle should not drawn if difference between y1 and y2 is not greater than 1', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(1, 2, 6, 3);
        expect(state).toEqual(false);
    });

    test('Rectangle should drawn if given the pair for left-top and bottom-right', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(1, 2, 6, 4);
        expect(state).toEqual(true);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['|','x',' ',' ',' ',' ','x',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Rectangle should drawn if given the pair for right-top and bottom-left', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(6, 2, 1, 4);
        expect(state).toEqual(true);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['|','x',' ',' ',' ',' ','x',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Rectangle should drawn if given the pair for right-bottom and top-left', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(6, 4, 1, 2);
        expect(state).toEqual(true);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['|','x',' ',' ',' ',' ','x',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Rectangle should drawn if given the pair for left-bottom and top-right', () => {
        const canvas = new Canvas(10, 4);
        const state = canvas.addRectangle(1, 4, 6, 2);
        expect(state).toEqual(true);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['|','x',' ',' ',' ',' ','x',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });
});


describe('Create Fill', () => {
    test('Bucket Fill Should not happen if the given point is not empty', () => {
        const canvas = new Canvas(10, 4);
        canvas.addRectangle(1, 2, 6, 4);
        canvas.fill(1, 4, 'c');
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['|','x',' ',' ',' ',' ','x',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Bucket fill scenario if the given point is within the rectangle', () => {
        const canvas = new Canvas(10, 4);
        canvas.addRectangle(1, 2, 6, 4);
        canvas.fill(2, 3, 'c');
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['|','x','c','c','c','c','x',' ',' ',' ',' ','|'],
            ['|','x','x','x','x','x','x',' ',' ',' ',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Bucket fill scenario if the given point is outside the rectangle', () => {
        const canvas = new Canvas(10, 4);
        canvas.addRectangle(1, 2, 6, 4);
        canvas.fill(8, 2, 'c');
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|','c','c','c','c','c','c','c','c','c','c','|'],
            ['|','x','x','x','x','x','x','c','c','c','c','|'],
            ['|','x',' ',' ',' ',' ','x','c','c','c','c','|'],
            ['|','x','x','x','x','x','x','c','c','c','c','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Bucket fill scenario if the given point is outside the rectangle and before the complete line', () => {
        const canvas = new Canvas(10, 4);
        canvas.addRectangle(1, 2, 6, 4);
        canvas.addLine(9, 1, 9, 4);
        canvas.fill(8, 2, 'c');
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|','c','c','c','c','c','c','c','c','x',' ','|'],
            ['|','x','x','x','x','x','x','c','c','x',' ','|'],
            ['|','x',' ',' ',' ',' ','x','c','c','x',' ','|'],
            ['|','x','x','x','x','x','x','c','c','x',' ','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Bucket fill scenario if the given point is outside the rectangle and after the complete line', () => {
        const canvas = new Canvas(10, 4);
        canvas.addRectangle(1, 2, 6, 4);
        canvas.addLine(9, 1, 9, 4);
        canvas.fill(10, 2, 'c');
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|',' ',' ',' ',' ',' ',' ',' ',' ','x','c','|'],
            ['|','x','x','x','x','x','x',' ',' ','x','c','|'],
            ['|','x',' ',' ',' ',' ','x',' ',' ','x','c','|'],
            ['|','x','x','x','x','x','x',' ',' ','x','c','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Bucket fill scenario if the given point is outside the rectangle and after the incomplete line', () => {
        const canvas = new Canvas(10, 4);
        canvas.addRectangle(1, 2, 6, 4);
        canvas.addLine(9, 1, 9, 3);
        canvas.fill(10, 2, 'c');
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|','c','c','c','c','c','c','c','c','x','c','|'],
            ['|','x','x','x','x','x','x','c','c','x','c','|'],
            ['|','x',' ',' ',' ',' ','x','c','c','x','c','|'],
            ['|','x','x','x','x','x','x','c','c','c','c','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });

    test('Bucket fill scenario if the line is added after the fill', () => {
        const canvas = new Canvas(10, 4);
        canvas.addRectangle(1, 2, 6, 4);
        canvas.addLine(9, 1, 9, 3);
        canvas.fill(10, 2, 'c');
        canvas.addLine(8, 1, 8, 3);
        const expected = [
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
            ['|','c','c','c','c','c','c','c','x','x','c','|'],
            ['|','x','x','x','x','x','x','c','x','x','c','|'],
            ['|','x',' ',' ',' ',' ','x','c','x','x','c','|'],
            ['|','x','x','x','x','x','x','c','c','c','c','|'],
            ['-','-','-','-','-','-','-','-','-','-','-','-'],
        ]
        expect(JSON.stringify(canvas.board)).toEqual(JSON.stringify(expected)); 
    });
});

describe('Draw', () => {

    const originalLog = console.log;
    afterEach(() => (console.log = originalLog));

    describe('Check console.log() output', () => {
        let consoleOutput = [];
        const mockedLog = output => consoleOutput.push(output);
        const canvas = new Canvas(10, 4);
        beforeEach(() => (console.log = mockedLog));
        test('Console log should draw the canvas', () => {
            canvas.draw();
            expect(consoleOutput).toEqual([
                '------------',
                '|          |',
                '|          |',
                '|          |',
                '|          |',
                '------------',
            ])
        });

        test('Console log should draw the line within the canvas', () => {
            consoleOutput = [];
            canvas.addLine(1,1,4,1);
            canvas.draw();
            expect(consoleOutput).toEqual([
                '------------',
                '|xxxx      |',
                '|          |',
                '|          |',
                '|          |',
                '------------',
            ])
        });

        test('Console log should draw the line and rectangle within the canvas', () => {
            consoleOutput = [];
            canvas.addRectangle(1, 2, 6, 4);
            canvas.draw();
            expect(consoleOutput).toEqual([
                '------------',
                '|xxxx      |',
                '|xxxxxx    |',
                '|x    x    |',
                '|xxxxxx    |',
                '------------',
            ])
        });

        test('Console log should draw the line, rectangle and fill the rectangle within the canvas', () => {
            consoleOutput = [];
            canvas.fill(2, 3, 'c');
            canvas.draw();
            expect(consoleOutput).toEqual([
                '------------',
                '|xxxx      |',
                '|xxxxxx    |',
                '|xccccx    |',
                '|xxxxxx    |',
                '------------',
            ])
        });
    });
    
});