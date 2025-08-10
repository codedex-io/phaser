// The Render Trio ☘️
// Codédex

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

const game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "https://i.imgur.com/Joul9GG.png");
}

function create() {
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;

  this.add.image(width / 2, height / 2, "background");
}

function update() {
  // We'll add interactivity later
}

