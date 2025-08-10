// WASD ↔️
// Codédex

// Declare global variables
let player;
let cursors;

function preload() {
  // Load the character image
  this.load.image("character", "https://i.imgur.com/TTQA8lp.gif");
}

function create() {
  // Add the player to the center of the screen
  player = this.add.image(400, 300, "character");

  // Enable arrow key input
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const speed = 3;

  // Left/right movement
  if (cursors.left.isDown) {
    player.x -= speed;
  } else if (cursors.right.isDown) {
    player.x += speed;
  }

  // Up/down movement
  if (cursors.up.isDown) {
    player.y -= speed;
  } else if (cursors.down.isDown) {
    player.y += speed;
  }
}

// Phaser configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Create the Phaser game instance
const game = new Phaser.Game(config);
