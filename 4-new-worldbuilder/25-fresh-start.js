// Fresh Start 🫧
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

let player, cursors, collectibles, enemy;
let score = 0, lives = 3;
let scoreText, livesText, restartText;
let gameOver = false, gameWon = false;
let coinsCollected = 0;
let totalCoins;
let playerStart = { x: 150, y: 500 };
let enemyStart = { x: 500, y: 450 };

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
  this.load.image("enemy", "https://i.imgur.com/sdFz5Xp.png");
}

function create() {
  this.add.image(400, 300, "bg").setScale(1.3);

  const platforms = this.physics.add.staticGroup();
  const greenPlatform = platforms.create(150, 500, "greenPlatform").setScale(2.5).refreshBody();
  const yellowPlatform = platforms.create(400, 400, "yellowPlatform").setScale(2.5).refreshBody();
  const bluePlatform = platforms.create(650, 300, "bluePlatform").setScale(2.5).refreshBody();
  const pinkPlatform = platforms.create(300, 200, "pinkPlatform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(playerStart.x, playerStart.y - 40, "frog").setScale(2.5);
  player.setCollideWorldBounds(false);

  const obstacles = this.physics.add.staticGroup();
  obstacles.create(greenPlatform.x + 30, greenPlatform.y - 60, "greenObstacle").setScale(2.5).refreshBody();
  obstacles.create(yellowPlatform.x + 30, yellowPlatform.y - 60, "yellowObstacle").setScale(2.5).refreshBody();
  obstacles.create(bluePlatform.x + 30, bluePlatform.y - 60, "blueObstacle").setScale(2.5).refreshBody();
  obstacles.create(pinkPlatform.x + 30, pinkPlatform.y - 60, "pinkObstacle").setScale(2.5).refreshBody();

  collectibles = this.physics.add.group();
  const c1 = collectibles.create(greenPlatform.x + 30, greenPlatform.y - 120, "collectible1").setScale(1.5);
  const c2 = collectibles.create(yellowPlatform.x + 30, yellowPlatform.y - 120, "collectible2").setScale(1.5);
  const c3 = collectibles.create(bluePlatform.x + 30, bluePlatform.y - 120, "collectible3").setScale(1.5);
  const c4 = collectibles.create(pinkPlatform.x + 30, pinkPlatform.y - 120, "collectible4").setScale(1.5);
  collectibles.children.iterate(coin => coin.body.allowGravity = false);

  totalCoins = collectibles.getChildren().length;

  enemy = this.physics.add.sprite(enemyStart.x, enemyStart.y, "enemy").setScale(2);
  enemy.setVelocityX(100);
  enemy.setCollideWorldBounds(true);
  enemy.setBounce(1, 0);

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, obstacles);
  this.physics.add.collider(player, enemy, hitEnemy, null, this);
  this.physics.add.overlap(player, collectibles, collectCoin, null, this);

  scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#fff" });
  livesText = this.add.text(16, 50, "Lives: 3", { fontSize: "32px", fill: "#fff" });
  restartText = this.add.text(config.width / 2, 300, "Press R to Restart", { fontSize: "24px", fill: "#ff0000" }).setOrigin(0.5).setVisible(false);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on("keydown-R", restartLevel, this);
}

function collectCoin(player, coin) {
  if (!gameOver && !gameWon) {
    coin.disableBody(true, true);
    score += 10;
    coinsCollected++;
    scoreText.setText("Score: " + score);
    if (coinsCollected >= totalCoins) {
      gameWon = true;
      restartText.setText("You Won! Press R to Restart").setVisible(true);
    }
  }
}

function hitEnemy(player, enemy) {
  if (!gameOver) {
    lives -= 1;
    livesText.setText("Lives: " + lives);
    if (lives <= 0) {
      gameOver = true;
      restartText.setText("Game Over! Press R to Restart").setVisible(true);
    }
  }
}

function restartLevel() {
  score = 0;
  lives = 3;
  coinsCollected = 0;
  gameOver = false;
  gameWon = false;
  scoreText.setText("Score: " + score);
  livesText.setText("Lives: " + lives);
  restartText.setVisible(false);

  player.setPosition(playerStart.x, playerStart.y - 40);
  enemy.setPosition(enemyStart.x, enemyStart.y);
  enemy.setVelocityX(100);

  collectibles.children.iterate(coin => coin.enableBody(true, coin.x, coin.y, true, true));
}

function update() {
  if (cursors.left.isDown) player.setVelocityX(-200);
  else if (cursors.right.isDown) player.setVelocityX(200);
  else player.setVelocityX(0);

  if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down) player.setVelocityY(-450);

  if (player.y > config.height) hitEnemy(player, enemy);

  if (gameOver || gameWon) {
    restartText.setVisible(true);
    player.setVelocityX(0);
    player.setVelocityY(0);
    enemy.setVelocityX(0);
  }
}

new Phaser.Game(config);
