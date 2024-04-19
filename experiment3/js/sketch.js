// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + millis();
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function gridCheck(grid, i, j, target) {
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
    return grid[i][j] == target;
  }
  return false;
}

function gridCode(grid, i, j, target) {
  const northBit = gridCheck(grid, i - 1, j, target) ? 1 : 0;
  const southBit = gridCheck(grid, i + 1, j, target) ? 1 : 0;
  const eastBit = gridCheck(grid, i, j + 1, target) ? 1 : 0;
  const westBit = gridCheck(grid, i, j - 1, target) ? 1 : 0;
  
  return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
}


function drawContext(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);
  const [tiOffset, tjOffset] = lookup[code];
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
}

const lookup = [
  [0 , -14], // NSEW
  [10, -12], // 1 SEW
  [10, -14], // 2 NEW
  [0 , 0], // 3 EW
  [9, -13], // 4 NSW

  [9, -12], // 5 SW
  [9, -14], // 6 SE
  [9, -13], // 7 W

  [11, -13], // 8 NES

  [11, -12], // 9 SE
  [11, -14], // 10 NE
  [11, -13], // 11 E

  [0, 0], // 12 NS

  [10, -12], // 13 S
  [10, -14], // 14 N
  
  [0, 0]  // 15 
];

/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  let noiseScale = .035;
  let n;
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      n = floor(100 * noise(i * noiseScale, j * noiseScale));
      if (n < 40) {
        row.push(".");
      }
      else if (n >= 40 && n < 65) {
        row.push("_");
      }
      else if (n >= 65){
        row.push("W")
      }
    }
    grid.push(row);
  }
  
  return grid;
}

function drawGrid(grid) {
  background(128);

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '_') {
        if (gridCheck(grid, i, j, "_")) {
          if (random(1) < 0.95) {
            placeTile(i, j, 0, 0);
          }
          else {
            placeTile(i, j, 1 + floor(random(3)), 0);
          }
        } else {
          //drawContext(grid, i, j, "_", 0, 0);
        }
      }
      else if (grid[i][j] == '.'){
        if (gridCheck(grid, i, j, ".")) {
          if (random(1) < 0.98) {
            placeTile(i, j, 0, 1);
          }
          else {
            placeTile(i, j, 1 + floor(random(3)), 1);
          }
        } else {
          //drawContext(grid, i, j, ".", 0, 0);
        }
      }
      else if (grid[i][j] == 'W'){
        if (gridCheck(grid, i, j, "W")) {
          placeTile(i, j, 0, 14);
          drawContext(grid, i, j, "W", 0, 14);
        } else {
          drawContext(grid, i, j, "W", 0, 14);
        }
      }
    }
  }
}




class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}