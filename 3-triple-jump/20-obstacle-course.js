// Obstacle Course 🏃‍♂️
// Codédex

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 },
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
let cursors;
let collectibles;

function preload() {
  this.load.image("frog", "https://i.imgur.com/NSsqbju.png");

  this.load.image("greenPlatform", "https://i.imgur.com/uEJoszN.png");
  this.load.image("yellowPlatform", "https://i.imgur.com/uhAy5nF.png");
  this.load.image("bluePlatform", "https://i.imgur.com/oSHt5fT.png");
  this.load.image("pinkPlatform", "https://i.imgur.com/TUKptDb.png");

  this.load.image("greenObstacle", "https://i.imgur.com/1Xm9qHQ.png");
  this.load.image("yellowObstacle", "https://i.imgur.com/3UbYQNw.png");
  this.load.image("blueObstacle", "https://i.imgur.com/yqdBMzJ.png");
  this.load.image("pinkObstacle", "https://i.imgur.com/noxAg7A.png");

  this.load.image("collectible1", "https://i.imgur.com/mB3HMeU.png");
  this.load.image("collectible2", "https://i.imgur.com/tF52I4f.png");
  this.load.image("collectible3", "https://i.imgur.com/MktA2DV.png");
  this.load.image("collectible4", "https://i.imgur.com/I40gewR.png");

  this.load.image("bg", "https://i.imgur.com/Sjz9xBy.png");
}

function create() {
  // Background
  this.add.image(600, 1000, "bg").setScale(1.3);

  // Platforms
  const platforms = this.physics.add.staticGroup();
  const greenPlatform = platforms.create(150, 500, "greenPlatform").setScale(2.5).refreshBody();
  const yellowPlatform = platforms.create(400, 400, "yellowPlatform").setScale(2.5).refreshBody();
  const bluePlatform = platforms.create(650, 300, "bluePlatform").setScale(2.5).refreshBody();
  const pinkPlatform = platforms.create(300, 200, "pinkPlatform").setScale(2.5).refreshBody();

  // Player
  player = this.physics.add.sprite(greenPlatform.x, greenPlatform.y - greenPlatform.displayHeight / 2 - 40, "frog").setScale(2.5);
  player.setCollideWorldBounds(false); // allow falling through bottom

  // Obstacles hovering slightly to the right of platforms
  const obstacles = this.physics.add.staticGroup();
  const greenObstacle = obstacles.create(greenPlatform.x + 30, greenPlatform.y - greenPlatform.displayHeight / 2 - 60, "greenObstacle").setScale(2.5).refreshBody();
  const yellowObstacle = obstacles.create(yellowPlatform.x + 30, yellowPlatform.y - yellowPlatform.displayHeight / 2 - 60, "yellowObstacle").setScale(2.5).refreshBody();
  const blueObstacle = obstacles.create(bluePlatform.x + 30, bluePlatform.y - bluePlatform.displayHeight / 2 - 60, "blueObstacle").setScale(2.5).refreshBody();
  const pinkObstacle = obstacles.create(pinkPlatform.x + 30, pinkPlatform.y - pinkPlatform.displayHeight / 2 - 60, "pinkObstacle").setScale(2.5).refreshBody();

  // Colliders
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, obstacles);

  // Collectibles group
  collectibles = this.physics.add.group();

  // Place all collectibles on top of their respective obstacles
  const c1 = collectibles.create(
    greenObstacle.x,
    greenObstacle.y - greenObstacle.displayHeight / 2 - 10,
    "collectible1"
  ).setScale(2);
  c1.body.allowGravity = false;

  const c2 = collectibles.create(
    yellowObstacle.x,
    yellowObstacle.y - yellowObstacle.displayHeight / 2 - 10,
    "collectible2"
  ).setScale(2);
  c2.body.allowGravity = false;

  const c3 = collectibles.create(
    blueObstacle.x,
    blueObstacle.y - blueObstacle.displayHeight / 2 - 10,
    "collectible3"
  ).setScale(2);
  c3.body.allowGravity = false;

  const c4 = collectibles.create(
    pinkObstacle.x,
    pinkObstacle.y - pinkObstacle.displayHeight / 2 - 10,
    "collectible4"
  ).setScale(2);
  c4.body.allowGravity = false;

  // Colliders for collectibles
  this.physics.add.collider(collectibles, platforms);
  this.physics.add.overlap(player, collectibles, (player, collectible) => {
    collectible.disableBody(true, true);
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Horizontal movement
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  } else {
    player.setVelocityX(0);
  }

  // Jump
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-450);
  }
}

new Phaser.Game(config);
