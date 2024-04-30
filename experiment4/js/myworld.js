"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  if(map == 0){
    randomSeed(worldSeed)
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 100 <= 0) {
    // mouth
    fill(194, 57, 57, 255);
    beginShape();
    vertex(-tw + 5*sin(millis()*0.001), 0 + 5*sin(millis()*0.001));
    vertex(0 + 5*sin(millis()*0.001), th + 5*sin(millis()*0.001));
    vertex(tw + 5*sin(millis()*0.001), 0 + 5*sin(millis()*0.001));
    vertex(0 + 5*sin(millis()*0.001), -th + 5*sin(millis()*0.001));
    endShape(CLOSE);

    fill(125, 0, 0, 255);
    ellipse(tw - p3_tileWidth()+ 5*sin(millis()*0.001), th - p3_tileHeight() * 2+ 5*sin(millis()*0.001), 64, 64)
    fill(78, 19, 19, 255);
    ellipse(tw - p3_tileWidth()+ 5*sin(millis()*0.001), th - p3_tileHeight() * 2+ 5*sin(millis()*0.001), 56, 56)
    fill (127, 98, 67, 255)
    for (let a = 0; a < 128; a += 8){
        if (a <= 64) {
            triangle(-tw - 4 + a + 5*sin(millis()*0.001), -th * 3 + 5*sin(millis()*0.001), -tw + a + 5*sin(millis()*0.001), -th * 3 + 5*sin(millis()*0.001), -tw -2 + a + (2+random()*4*cos(millis() * 0.002)) + 5*sin(millis()*0.001), -th + 5*sin(millis()*0.001))
        }
        else {
            triangle(-tw - 4 + a - 64 + 5*sin(millis()*0.001), th * 3 + 5*sin(millis()*0.001), -tw + a - 64 + 5*sin(millis()*0.001), th * 3 + 5*sin(millis()*0.001), -tw - 2 + a - 64 + (2+random()*4*cos(millis() * 0.002)) + 5*sin(millis()*0.001), -th + 5*sin(millis()*0.001))
        }
    }

  } else if (XXH.h32("tile:" + [i, j], worldSeed) % 100 <= 1){
    // eyeballs
    fill(194, 57, 57, 255);
    beginShape();
    vertex(-tw + 5*sin(millis()*0.001), 0 + 5*sin(millis()*0.001));
    vertex(0 + 5*sin(millis()*0.001), th + 5*sin(millis()*0.001));
    vertex(tw + 5*sin(millis()*0.001), 0 + 5*sin(millis()*0.001));
    vertex(0 + 5*sin(millis()*0.001), -th + 5*sin(millis()*0.001) );
    endShape(CLOSE);
    ellipse(tw - p3_tileWidth() + 5*sin(millis()*0.001), th - p3_tileHeight() * 2 + 5*sin(millis()*0.001), 64, 64)
    fill(208, 208, 208, 255);
    ellipse(tw - p3_tileWidth() + 5*sin(millis()*0.001), th - p3_tileHeight() * 2 + 5*sin(millis()*0.001), 60, 96 * abs(max(min(sin(millis() * 0.002 + noise(i, j)*4), .5), -.5)))

    
    
    if (abs(max(min(sin(millis() * 0.002 + noise(i, j)*4), .5), -.5)) > .15) {
        fill(194, 57, 57, 100)
        ellipse(tw - p3_tileWidth() + max(min((min(mouseX,width) - (width/2))/32, 32) , -32) + 5*sin(millis()*0.001), th - p3_tileHeight() * 2 + max(min((min(mouseY, height) - (height/2))/32, 32)) + 5*sin(millis()*0.001), 32, 32)

        fill(0, 0, 0, 255);
        ellipse(tw - p3_tileWidth() + max(min((min(mouseX,width) - (width/2))/32, 32), -32) + 5*sin(millis()*0.001), th - p3_tileHeight() * 2 + max(min((min(mouseY, height) - (height/2))/32, 32)) + 5*sin(millis()*0.001), 16, 16)
    }
  } 
  else {
    // FLESH
    fill(158 + 50*noise(i, j), 31+ 10*noise(i, j), 45+ 10*noise(i, j), 255)
    beginShape();
    vertex(-tw + 5*sin(millis()*0.001), 0 + 5*sin(millis()*0.001));
    vertex(0 + 5*sin(millis()*0.001), th + 5*sin(millis()*0.001));
    vertex(tw + 5*sin(millis()*0.001), 0 + 5*sin(millis()*0.001));
    vertex(0 + 5*sin(millis()*0.001), -th + 5*sin(millis()*0.001));
    endShape(CLOSE);
  }

  push();



  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }

  pop();
  }
  
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
