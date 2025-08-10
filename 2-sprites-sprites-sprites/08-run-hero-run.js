// Run, Hero, Run! 👟
// Codédex

function preload() {
  // Load Fox Girl spritesheet
  this.load.spritesheet("foxGirl", "https://i.imgur.com/7CU9Ky9.png", {
    frameWidth: 120,
    frameHeight: 120
  });
}

function create() {
  // Add Fox Girl to the scene
  const foxGirl = this.add.sprite(400, 300, "foxGirl");

  // Create back-facing walk animation (↑ walk up)
  this.anims.create({
    key: "walk-up",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 6, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  // Play the animation
  foxGirl.play("walk-up");
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: { preload, create }
};

new Phaser.Game(config);
