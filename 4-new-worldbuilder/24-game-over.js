// Game Over 🛑
// Codédex

let player;
let coins;
let enemy;
let platforms;
let gameOver = false;
let gameWon = false;
let coinsCollected = 0;
let totalCoins = 3;

function preload() {
  this.load.image("player", "https://i.imgur.com/NSsqbju.png");
  this.load.image("platform", "https://i.imgur.com/uEJoszN.png");
  this.load.image("coin", "https://i.imgur.com/mB3HMeU.png");
  this.load.image("enemy", "https://i.imgur.com/ChV1G4V.png");
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, "platform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(150, 450, "player").setScale(2.5);
  this.physics.add.collider(player, platforms);

  enemy = this.physics.add.sprite(500, 450, "enemy").setScale(2.5);
  this.physics.add.collider(enemy, platforms);
  this.physics.add.collider(player, enemy, () => {
    gameOver = true;
  });

  coins = this.physics.add.group();
  const c1 = coins.create(200, 500, "coin");
  const c2 = coins.create(400, 500, "coin");
  const c3 = coins.create(600, 500, "coin");
  coins.children.iterate(c => (c.body.allowGravity = false));

  this.physics.add.overlap(player, coins, (player, coin) => {
    coin.disableBody(true, true);
    coinsCollected += 1;
    if (coinsCollected === totalCoins) gameWon = true;
  });
}

function update() {
  if (player.y > 600) gameOver = true;
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: "arcade", arcade: { gravity: { y: 700 }, debug: true } },
  scene: { preload, create, update },
});
