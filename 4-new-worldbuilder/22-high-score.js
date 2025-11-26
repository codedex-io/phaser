// High Score 💯
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
let platforms;
let coins;
let redCoins;
let score = 0;
let scoreText;

function preload() {
  this.load.image("player", "https://i.imgur.com/NSsqbju.png");
  this.load.image("platform", "https://i.imgur.com/uEJoszN.png");
  this.load.image("coin", "https://i.imgur.com/mB3HMeU.png");
  this.load.image("redCoin", "https://i.imgur.com/0RXLsQv.png");
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, "platform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(150, 450, "player").setScale(2.5);
  this.physics.add.collider(player, platforms);

  coins = this.physics.add.group();
  redCoins = this.physics.add.group();

  const c1 = coins.create(300, 500, "coin").setScale(2);
  c1.body.allowGravity = false;

  const r1 = redCoins.create(500, 500, "redCoin").setScale(2);
  r1.body.allowGravity = false;

  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#fff",
  });

  this.physics.add.overlap(player, coins, (player, coin) => {
    coin.disableBody(true, true);
    score += 1;
    scoreText.setText("Score: " + score);
  });

  this.physics.add.overlap(player, redCoins, (player, coin) => {
    coin.disableBody(true, true);
    score -= 1;
    scoreText.setText("Score: " + score);
  });
}

function update() {}

new Phaser.Game(config);
