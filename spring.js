class Spring extends VerletSpring2D {

  constructor(a, b) {
    super(a, b, w, 1);
    this.toDelete = false;
    physics.addSpring(this);
  }

  remove() {
    physics.removeSpring(this);
    this.toDelete = true;
  }

  display() {
    stroke(r, g, b);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}