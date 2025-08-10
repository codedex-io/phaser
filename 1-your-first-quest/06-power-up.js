// Power-Up! 🌟
// Codédex

function preload() { 
  // Load the coin image
  this.load.image("coin", "https://i.imgur.com/Jjz7F1z.png");
}

function create() {
  // Set up mouse click (or touch) listener
  this.input.on("pointerdown", function (pointer) {
    // Add a coin at the mouse/touch coordinates
    this.add.image(pointer.x, pointer.y, "coin");
  }, this);
}

function update() {
  // No continuous updates needed for this example
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
