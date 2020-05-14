let cols = 50;
let rows = 40;

let particles = make2DArray(cols,rows);
let springs = [];

// size of the square on the grid
let w = 10;

let physics;
let wb;
let wb2;

let amt = 0;
let amtY = 0;

let r = 255; 
let g = 255; 
let b = 255;
let t = 0;

let xoff=0;
let yoff =0;
let counter = 0;
let wind;

let song;
let bloop;

function preload() {
    song = loadSound('jamuary3.mp3');
    bloop = loadSound('bloop.wav');
    
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  song.loop(); 
  bloop.amp(.08);
  physics = new VerletPhysics2D();

  
//add Gravity once 
  let gravity = new Vec2D(0, 1);  
  let gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);
  
//add Wind
  wind = new Vec2D(0,0);
  wb = new WindBehavior(wind);
  physics.addBehavior(wb);
  
//Create Fabric Grid
  let x = -50;
  for (let i = 0; i < cols; i++) {
    let y = 0;
    for (let j = 0; j < rows; j++) {
      let p = new Particle(x, y);
      particles[i][j] = p;
      physics.addParticle(p);
      y = y + w;
    }
    x = x + w;
  }
  
//add springs
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = particles[i][j];
      if (i != cols-1) {
        let b1 = particles[i+1][j];
        let s1 = new Spring(a, b1);
        springs.push(s1);
        a.attach(s1);
      }
      if (j != rows-1) {
        let b2 = particles[i][j+1];
        let s2 = new Spring(a, b2);
        springs.push(s2);
        a.attach(s2);
      }
    }
  }

//lock particles
  
  particles[cols/2][0].lock();
  particles[0][cols/2].lock();
  particles[cols/2][rows-1].lock();
  // particles[rows-1][cols/2].lock();
  particles[0][0].lock();
  particles[cols-1][rows-1].lock();
  particles[cols/2][rows-1].lock();
  particles[cols-1][0].lock();
  particles[0][rows-1].lock();
  
}


function draw() {
  background(0,25); //add transparency to background
  physics.update();
  addWind();
  
  //display the fabric
  
    for (let s of springs) {
    s.display();
  }
  
  //add perlin noise color change
  colorChange();
  
  // logic to remove springs
  for (let i = springs.length-1; i >= 0; i--) {
    if (springs[i].toDelete) {
      springs.splice(i, 1); 
    }
  }
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function colorChange(){
  
  r = 255 * noise(t+10);
  g = 255 * noise(t+15);
  b = 255 * noise(t+20);
  
  t = t + 0.01;
}


function addWind(){
    xoff = xoff - 1; // draw, prob
    yoff = yoff-1;
    
    amt = noise(xoff); // function
    amtY = noise(yoff);
    
    wind.x = amt;
    wind.y = amtY;
   
    wb.configure(1);

}


function mousePressed() {
  for (let i = 0; i < cols; i++) {
     for (let j = 0; j < rows; j++) {
      particles[i][j].clicked(mouseX, mouseY);
    }
  }
}