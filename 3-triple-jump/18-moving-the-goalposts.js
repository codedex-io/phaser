// Moving the Goalposts 🥅
// Codédex

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 }, // player will fall down
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

let player;
let ground;
let bg;

function preload() {
  this.load.image("player", "https://i.imgur.com/sdFz5Xp.png");
  this.load.image("ground", "https://i.imgur.com/Zmp7rQG.png");
  this.load.image("bg", "https://i.imgur.com/Sjz9xBy.png");
}

function create() {
  // add background
  this.add.image(300, 200, "bg");

  // add the player sprite with physics enabled
  player = this.physics.add.sprite(100, 450, "player");

  // add a static group for ground
  ground = this.physics.add.staticGroup();

  // create one ground platform at the bottom of the screen
  ground.create(400, 568, "ground").setScale(2).refreshBody();

  // create new ground platforms
  ground.create(150, 350, "ground");
  ground.create(500, 100, "ground");

  // collider will come in Exercise 15!
  this.physics.add.collider(player, ground);

  // create keyboard input
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // if statement changing the velocity when the player jumps
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-400);
  }
  // if statement changing direction left and right
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }
}

new Phaser.Game(config);
