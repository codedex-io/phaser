// Enemies 😈
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
  scene: { preload, create, update },
};

let player;
let cursors;
let collectibles;
let score = 0;
let scoreText;
let enemy;

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

  this.load.image("enemy", "https://i.imgur.com/sdFz5Xp.png");
  this.load.image("bg", "https://i.imgur.com/Sjz9xBy.png");
}

function create() {
  this.add.image(400, 300, "bg").setScale(1.3);

  const platforms = this.physics.add.staticGroup();
  const gp = platforms.create(150, 500, "greenPlatform").setScale(2.5).refreshBody();
  const yp = platforms.create(400, 400, "yellowPlatform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(150, 460, "frog").setScale(2.5);

  const obstacles = this.physics.add.staticGroup();
  const go = obstacles.create(gp.x + 30, gp.y - 60, "greenObstacle").setScale(2.5).refreshBody();
  const yo = obstacles.create(yp.x + 30, yp.y - 60, "yellowObstacle").setScale(2.5).refreshBody();

  collectibles = this.physics.add.group();
  const c1 = collectibles.create(go.x, go.y - 50, "collectible1").setScale(1.5);
  c1.body.allowGravity = false;
  const c2 = collectibles.create(yo.x, yo.y - 50, "collectible2").setScale(1.5);
  c2.body.allowGravity = false;

  enemy = this.physics.add.sprite(600, 450, "enemy").setScale(2);
  enemy.setVelocityX(100);
  enemy.setBounce(1, 0);
  enemy.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, obstacles);
  this.physics.add.collider(enemy, platforms);
  this.physics.add.overlap(player, collectibles, collectItem, null, this);
  this.physics.add.collider(player, enemy, hitEnemy, null, this);

  scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#fff" });

  cursors = this.input.keyboard.createCursorKeys();
}

function collectItem(player, item) {
  item.disableBody(true, true);
  score += 10;
  scoreText.setText("Score: " + score);
}

function hitEnemy() {
  player.setPosition(150, 460);
}

function update() {
  if (cursors.left.isDown) player.setVelocityX(-200);
  else if (cursors.right.isDown) player.setVelocityX(200);
  else player.setVelocityX(0);

  if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down)
    player.setVelocityY(-450);

  if (player.y > config.height) player.setPosition(150, 460);
}

new Phaser.Game(config);
