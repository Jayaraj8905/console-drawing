# Console Drawing Program

## Description

A simple **console** version of a drawing program using node.js

[Functionalities]
1. Create a new canvas by issuing the command **C w h**. **w** and **h** are width and height of the canvas.
2. Draw the line by issuing the command **L x1 y1 x2 y2**. x1, y1 and x2, y2 are the coordinates of the line.
3. Draw the rectangle by issuing the command **R x1 y1 x2 y2**. x1, y1 and x2, y2 are the coordinates of the rectangle.
4. Fill the canvas by issuing the command **B x y c**. x and y are coordinates and c is the color.
4. Quit the canvas by issuing the command **Q**.

## Prerequisites

[Node.js](https://nodejs.org/en/) >= version 12.0

To check if **node** is installed, try a command below

```sh
node -v
-> v12.0.0
```

## How to run

1. Open window **CMD**(cmd.exe)
2. CD to the root path of this project folder
3. Run a command below

```sh
npm install
```

After the above command, execute a commmand like below

### Run the program

```sh
npm start
```

### Run the test cases

```sh
npm test
```

## Used Libraries

* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - command line interface for **Node.js**

## Assumptions

1. The command should be exactly matched as mentioned in the functionalities
2. The commands are case sensitive.
3. The Rectange command will throw invalid coordinates, if it does not meet the rectangle dimensions criteria.
4. Canvas has to be created to draw the line or rectangle or fill. Otherwise error has thrown.
5. After fill also, the rectangle or line can draw on the color.

## Explanation
### Canvas
* Canvas is a two dimensional array which will hold the data based on the coordinates.

### Draw Line
* Line is drawn by changing the coordinates to `x` based on the given coordinates vertically and horizontally

### Draw Rectangle
* Rectangle is drawn by drawing the line based on the coordinates

### Bucket Fill
* Bucket fill is achieved by `Flood Fill` algorithm.
