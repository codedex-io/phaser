// Siren Song 🎧
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

let player, platforms, coins, cursors;
let score = 0;
let scoreText;

function preload() {
  this.load.audio("bgMusic", "https://opengameart.org/sites/default/files/audio_preview/background_0.mp3.ogg");
  this.load.audio("coinSound", "https://opengameart.org/sites/default/files/1_Coins_0.ogg");
  this.load.audio("jumpSound", "https://opengameart.org/sites/default/files/audio_preview/jumpland.wav.mp3");

  this.load.image("player", "https://i.imgur.com/NSsqbju.png");
  this.load.image("platform", "https://i.imgur.com/uEJoszN.png");
  this.load.image("coin", "https://i.imgur.com/mB3HMeU.png");
}

function create() {
  this.bgMusic = this.sound.add("bgMusic", { loop: true, volume: 0.5 });
  this.bgMusic.play();

  platforms = this.physics.add.staticGroup();
  platforms.create(150, 500, "platform").setScale(2.5).refreshBody();
  platforms.create(400, 400, "platform").setScale(2.5).refreshBody();
  platforms.create(650, 300, "platform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(150, 460, "player").setScale(2.5);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);

  coins = this.physics.add.group();
  const c1 = coins.create(150, 410, "coin");
  const c2 = coins.create(400, 360, "coin");
  const c3 = coins.create(650, 260, "coin");
  coins.children.iterate(c => (c.body.allowGravity = false));

  this.physics.add.collider(coins, platforms);

  this.physics.add.overlap(player, coins, (player, coin) => {
    coin.disableBody(true, true);
    score += 1;
    scoreText.setText("Score: " + score);
    this.sound.play("coinSound");
  });

  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#fff",
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) player.setVelocityX(-200);
  else if (cursors.right.isDown) player.setVelocityX(200);
  else player.setVelocityX(0);

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-450);
    this.sound.play("jumpSound");
  }
}

new Phaser.Game(config);
