// The Render Trio ☘️
// Codédex

// Config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#002fa7",
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);

// Load assets before the game starts
function preload() {
  this.load.image("background", "https://i.imgur.com/Joul9GG.png");
}

// Place assets on the screen
function create() {
  // Get game canvas width and height from the config
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;

  // Add the background image centered on the canvas
  this.add.image(width / 2, height / 2, "background");
}

// Update game logic every frame (empty for now)
function update() {
  // We'll add interactivity later
}

