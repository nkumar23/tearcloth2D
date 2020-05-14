class Particle extends VerletParticle2D {

  constructor( x,  y) {
    super(x, y);
    this.col = color(255);
    this.connections = [];
  }
  
  addSpring1(){
    let s1 = new Spring(a, b1);
        springs.push(s1);
        a.attach(s1);
        b1.attach(s1);
        physics.addSpring(s1)
  }
  
  addSpring2(){
    let s2 = new Spring(a, b2);
        springs.push(s2);
        a.attach(s2);
        b2.attach(s2);
        physics.addSpring(s2);
  }
  
  attach(spring) {
    this.connections.push(spring); 
  }

   display() {
    stroke(r,g,b);
    strokeWeight(2);
    //ellipse(this.x, this.y, 10);
    line(this.connections[0].a.x, this.connections[0].a.y, this.connections[0].b.x, this.connections[0].b.y);
    line(this.connections[1].a.x, this.connections[1].a.y, this.connections[1].b.x, this.connections[1].b.y);

   }
  
  windForce(wind){
    
  }
  
  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < 10) {      
      // this.connections.splice(0,1); // remove spring connection upon click
      for (let s of this.connections) {
        s.remove();   
      }
    // bloop.play();
    }
  }
}