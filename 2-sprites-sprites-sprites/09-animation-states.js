// Animation States 🔛
// Codédex

let foxGirl;
let cursors;
let speed = 3;

function preload() {
  this.load.spritesheet("foxGirl", "https://i.imgur.com/7CU9Ky9.png", {
    frameWidth: 120,  
    frameHeight: 120 
  });
}

function create() {
  foxGirl = this.add.sprite(100, 100, "foxGirl");

  // Create animations for all 4 directions
  this.anims.create({
    key: "walk-down",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "walk-up",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 6, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "walk-right",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 12, end: 17 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "walk-left",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 18, end: 23 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    foxGirl.x -= speed;
    foxGirl.anims.play("walk-left", true);
  }
  else if (cursors.right.isDown) {
    foxGirl.x += speed;
    foxGirl.anims.play("walk-right", true);
  }
  else if (cursors.up.isDown) {
    foxGirl.y -= speed;
    foxGirl.anims.play("walk-up", true);
  }
  else if (cursors.down.isDown) {
    foxGirl.y += speed;
    foxGirl.anims.play("walk-down", true);
  }
  else {
    // Stop on the first frame of the current animation
    foxGirl.anims.stop();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);
