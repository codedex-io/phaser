// Fresh Start 🫧
// Codédex

let player, enemy, coins, platforms;
let gameOver = false;
let gameWon = false;
let score = 0;
let lives = 3;

const playerStart = { x: 150, y: 450 };
const enemyStart = { x: 500, y: 450 };

function preload() {
  this.load.image("player", "https://i.imgur.com/NSsqbju.png");
  this.load.image("enemy", "https://i.imgur.com/ChV1G4V.png");
  this.load.image("coin", "https://i.imgur.com/mB3HMeU.png");
  this.load.image("platform", "https://i.imgur.com/uEJoszN.png");
}

function create() {
  restartText = this.add.text(400, 300, "Press R to Restart", {
    fontSize: "48px",
    fill: "#f00",
  });
  restartText.setOrigin(0.5);
  restartText.setVisible(false);

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, "platform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(playerStart.x, playerStart.y, "player");
  this.physics.add.collider(player, platforms);

  enemy = this.physics.add.sprite(enemyStart.x, enemyStart.y, "enemy");
  this.physics.add.collider(enemy, platforms);

  coins = this.physics.add.group();
  const c1 = coins.create(200, 500, "coin");
  const c2 = coins.create(400, 500, "coin");
  const c3 = coins.create(600, 500, "coin");
  coins.children.iterate(c => (c.body.allowGravity = false));

  this.physics.add.overlap(player, coins, (player, coin) => {
    coin.disableBody(true, true);
    score += 1;
    if (score === 3) gameWon = true;
  });

  this.physics.add.collider(player, enemy, () => {
    lives -= 1;
    if (lives <= 0) gameOver = true;
  });

  this.input.keyboard.on("keydown-R", () => {
    restartLevel();
    restartText.setVisible(false);
  });
}

function restartLevel() {
  score = 0;
  lives = 3;
  gameOver = false;
  gameWon = false;

  player.setPosition(playerStart.x, playerStart.y);
  enemy.setPosition(enemyStart.x, enemyStart.y);

  coins.children.iterate(c => c.enableBody(true, c.x, c.y, true, true));
}

function update() {
  if (gameOver || gameWon) {
    restartText.setVisible(true);
    player.setVelocity(0);
    enemy.setVelocity(0);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: "arcade", arcade: { gravity: { y: 700 }, debug: true } },
  scene: { preload, create, update },
});
