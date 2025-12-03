// Game Over 🛑
// Codédex

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 700 }, debug: true },
  },
  scene: { preload, create, update },
};

let player;
let cursors;
let collectibles;
let enemy;
let score = 0;
let lives = 3;
let gameOver = false;
let gameWon = false;
let scoreText;
let livesText;

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
  const greenPlatform = platforms.create(150, 500, "greenPlatform").setScale(2.5).refreshBody();
  const yellowPlatform = platforms.create(400, 400, "yellowPlatform").setScale(2.5).refreshBody();
  const bluePlatform = platforms.create(650, 300, "bluePlatform").setScale(2.5).refreshBody();
  const pinkPlatform = platforms.create(300, 200, "pinkPlatform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(150, 460, "frog").setScale(2.5);

  const obstacles = this.physics.add.staticGroup();
  const greenObstacle = obstacles.create(greenPlatform.x + 30, greenPlatform.y - 60, "greenObstacle").setScale(2.5).refreshBody();
  const yellowObstacle = obstacles.create(yellowPlatform.x + 30, yellowPlatform.y - 60, "yellowObstacle").setScale(2.5).refreshBody();
  const blueObstacle = obstacles.create(bluePlatform.x + 30, bluePlatform.y - 60, "blueObstacle").setScale(2.5).refreshBody();
  const pinkObstacle = obstacles.create(pinkPlatform.x + 30, pinkPlatform.y - 60, "pinkObstacle").setScale(2.5).refreshBody();

  collectibles = this.physics.add.group();
  const c1 = collectibles.create(greenObstacle.x, greenObstacle.y - 50, "collectible1").setScale(1.5);
  const c2 = collectibles.create(yellowObstacle.x, yellowObstacle.y - 50, "collectible2").setScale(1.5);
  const c3 = collectibles.create(blueObstacle.x, blueObstacle.y - 50, "collectible3").setScale(1.5);
  const c4 = collectibles.create(pinkObstacle.x, pinkObstacle.y - 50, "collectible4").setScale(1.5);

  collectibles.children.iterate(c => c.body.allowGravity = false);

  enemy = this.physics.add.sprite(600, 450, "enemy").setScale(2);
  enemy.setVelocityX(120);
  enemy.setBounce(1, 0);
  enemy.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, obstacles);
  this.physics.add.collider(enemy, platforms);
  this.physics.add.overlap(player, collectibles, collectItem, null, this);
  this.physics.add.collider(player, enemy, hitEnemy, null, this);

  scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#fff" });
  livesText = this.add.text(16, 50, "Lives: 3", { fontSize: "32px", fill: "#fff" });

  cursors = this.input.keyboard.createCursorKeys();
}

function collectItem(player, item) {
  if (gameOver || gameWon) return;

  item.disableBody(true, true);
  score += 10;
  scoreText.setText("Score: " + score);

  if (collectibles.countActive(true) === 0) {
    gameWon = true;
    scoreText.setText("You Won!");
  }
}

function hitEnemy() {
  if (gameOver || gameWon) return;

  lives--;
  livesText.setText("Lives: " + lives);

  if (lives <= 0) {
    gameOver = true;
    player.setTint(0xff0000);
    player.setVelocity(0);
  } else {
    player.setPosition(150, 460);
  }
}

function update() {
  if (gameOver || gameWon) return;

  if (cursors.left.isDown) player.setVelocityX(-200);
  else if (cursors.right.isDown) player.setVelocityX(200);
  else player.setVelocityX(0);

  if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down)
    player.setVelocityY(-450);

  if (player.y > config.height) hitEnemy();
}

new Phaser.Game(config);
