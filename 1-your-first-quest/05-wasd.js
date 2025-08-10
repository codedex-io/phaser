// WASD ↔️
// Codédex

let player;
let cursors;

function preload() { 
  this.load.image("character", "https://i.imgur.com/TTQA8lp.gif");
}

function create() {
  player = this.add.image(400, 300, "character");
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const speed = 3;
  
  if (cursors.left.isDown) {
    player.x -= speed;
  } else if (cursors.right.isDown) {
    player.x += speed;
  }

  if (cursors.up.isDown) {
    player.y -= speed;
  } else if (cursors.down.isDown) {
    player.y += speed;
  }
}

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

const game = new Phaser.Game(config);
