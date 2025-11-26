// Enemies 😈
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
let platforms;
let enemy;
let lives = 3;
let livesText;

function preload() {
  this.load.image("player", "https://i.imgur.com/NSsqbju.png");
  this.load.image("platform", "https://i.imgur.com/uEJoszN.png");
  this.load.image("enemy", "https://i.imgur.com/ChV1G4V.png");
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, "platform").setScale(2.5).refreshBody();

  player = this.physics.add.sprite(150, 450, "player").setScale(2.5);
  this.physics.add.collider(player, platforms);

  enemy = this.physics.add.sprite(500, 450, "enemy").setScale(2.5);
  enemy.setVelocityX(100);
  enemy.setCollideWorldBounds(true);
  enemy.setBounce(1, 0);

  this.physics.add.collider(enemy, platforms);

  livesText = this.add.text(16, 16, "Lives: 3", {
    fontSize: "32px",
    fill: "#fff",
  });

  this.physics.add.collider(player, enemy, () => {
    lives -= 1;
    livesText.setText("Lives: " + lives);
  });
}

function update() {}

new Phaser.Game(config);
