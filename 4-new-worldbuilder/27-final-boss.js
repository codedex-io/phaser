// Final Boss 💪
// Codédex

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 700 }, debug: false }
  },
  scene: { preload, create, update }
};

let player, enemy, cursors, keys;
let platforms, collectibles;
let score = 0;
let lives = 3;
let gameOver = false;
let gameWon = false;
let scoreText, livesText, restartText;
let bgMusic;

const playerStart = { x: 150, y: 460 };
const enemyStart = { x: 500, y: 400 };

function preload() {
  this.load.image("bg", "https://i.imgur.com/Sjz9xBy.png");
  this.load.image("frog", "https://i.imgur.com/NSsqbju.png");
  this.load.image("enemy", "https://i.imgur.com/sdFz5Xp.png");
  this.load.image("platform", "https://i.imgur.com/uEJoszN.png");
  this.load.image("coin", "https://i.imgur.com/mB3HMeU.png");
  this.load.audio("bgMusic", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  this.load.audio("coinSound", "https://freesound.org/data/previews/331/331912_3248244-lq.mp3");
  this.load.audio("jumpSound", "https://freesound.org/data/previews/82/82921_1022651-lq.mp3");
  this.load.audio("hitSound", "https://freesound.org/data/previews/257/257447_4486188-lq.mp3");
}

function create() {
  this.add.image(400, 300, "bg").setScale(1.1);

  platforms = this.physics.add.staticGroup();
  platforms.create(150, 500, "platform").setScale(2.2).refreshBody();
  platforms.create(400, 380, "platform").setScale(2.2).refreshBody();
  platforms.create(650, 260, "platform").setScale(2.2).refreshBody();

  player = this.physics.add.sprite(playerStart.x, playerStart.y, "frog").setScale(2);
  player.setCollideWorldBounds(true);

  enemy = this.physics.add.sprite(enemyStart.x, enemyStart.y, "enemy").setScale(1.8);
  enemy.setVelocityX(120);
  enemy.setBounce(1, 0);
  enemy.setCollideWorldBounds(true);

  collectibles = this.physics.add.group();
  const c1 = collectibles.create(150, 450 - 40, "coin").setScale(0.6);
  c1.body.allowGravity = false;
  const c2 = collectibles.create(400, 330 - 40, "coin").setScale(0.6);
  c2.body.allowGravity = false;
  const c3 = collectibles.create(650, 210 - 40, "coin").setScale(0.6);
  c3.body.allowGravity = false;
  const c4 = collectibles.create(300, 300 - 40, "coin").setScale(0.6);
  c4.body.allowGravity = false;

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(enemy, platforms);
  this.physics.add.collider(collectibles, platforms);

  this.physics.add.overlap(player, collectibles, (p, coin) => {
    if (gameOver || gameWon) return;
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);
    this.sound.play("coinSound");
    if (collectibles.countActive(true) === 0) {
      gameWon = true;
      restartText.setText("You Win! Press R to Restart").setVisible(true);
      bgMusic.pause();
      player.setVelocity(0);
      enemy.setVelocityX(0);
    }
  }, null, this);

  this.physics.add.collider(player, enemy, (p, e) => {
    if (gameOver || gameWon) return;
    lives -= 1;
    livesText.setText("Lives: " + lives);
    this.sound.play("hitSound");
    if (lives <= 0) {
      gameOver = true;
      restartText.setText("Game Over! Press R to Restart").setVisible(true);
      bgMusic.pause();
      player.setVelocity(0);
      enemy.setVelocityX(0);
    } else {
      player.setPosition(playerStart.x, playerStart.y);
    }
  }, null, this);

  scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "28px", fill: "#fff" });
  livesText = this.add.text(16, 50, "Lives: 3", { fontSize: "28px", fill: "#fff" });
  restartText = this.add.text(config.width / 2, 300, "Press R to Restart", { fontSize: "22px", fill: "#ff6666" }).setOrigin(0.5).setVisible(false);

  bgMusic = this.sound.add("bgMusic", { loop: true, volume: 0.4 });
  bgMusic.play();

  cursors = this.input.keyboard.createCursorKeys();
  keys = this.input.keyboard.addKeys("W,A,S,D");
  this.input.keyboard.on("keydown-R", restartLevel, this);
}

function update() {
  if (gameOver || gameWon) {
    player.setVelocityX(0);
    return;
  }

  const left = cursors.left.isDown || keys.A.isDown;
  const right = cursors.right.isDown || keys.D.isDown;
  const up = cursors.up.isDown || keys.W.isDown;

  if (left) player.setVelocityX(-220);
  else if (right) player.setVelocityX(220);
  else player.setVelocityX(0);

  if (up && player.body.blocked.down) {
    player.setVelocityY(-480);
    this.sound.play("jumpSound");
  }

  if (player.y > config.height + 50) {
    lives -= 1;
    livesText.setText("Lives: " + lives);
    if (lives <= 0) {
      gameOver = true;
      restartText.setText("Game Over! Press R to Restart").setVisible(true);
      bgMusic.pause();
      player.setVelocity(0);
      enemy.setVelocityX(0);
    } else {
      player.setPosition(playerStart.x, playerStart.y);
    }
  }
}

function restartLevel() {
  score = 0;
  lives = 3;
  gameOver = false;
  gameWon = false;
  scoreText.setText("Score: 0");
  livesText.setText("Lives: 3");
  restartText.setVisible(false);
  player.setPosition(playerStart.x, playerStart.y);
  enemy.setPosition(enemyStart.x, enemyStart.y);
  enemy.setVelocityX(120);
  collectibles.children.iterate(c => c.enableBody(true, c.x, c.y, true, true));
  if (bgMusic && bgMusic.isPaused) bgMusic.resume();
  if (!bgMusic.isPlaying) bgMusic.play();
}

new Phaser.Game(config);
