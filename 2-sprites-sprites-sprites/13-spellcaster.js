// Spellcaster ✨
// Codédex

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let keys;
let speed = 3;
let runSpeed = 6;
let currentState;

let background;
let coin;

const states = {
  idle: {
    onEnter() {
      player.anims.stop();
      player.setFrame(0);
    },
    onUpdate() {
      if (keys.space.isDown) return "attack";
      if (keys.ctrl.isDown) return "play-flute";
      if (keys.shift.isDown && !(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown)) return "cast-spell";

      if (cursors.left.isDown) return keys.shift.isDown ? "run-left" : "walk-left";
      if (cursors.right.isDown) return keys.shift.isDown ? "run-right" : "walk-right";
      if (cursors.up.isDown) return keys.shift.isDown ? "run-up" : "walk-up";
      if (cursors.down.isDown) return keys.shift.isDown ? "run-down" : "walk-down";

      return "idle";
    },
    onExit() {}
  },

  "walk-left": {
    onEnter() { player.anims.play("walk-left", true); },
    onUpdate() {
      if (!cursors.left.isDown) return "idle";
      player.x -= speed;
      return "walk-left";
    },
    onExit() {}
  },
  "walk-right": {
    onEnter() { player.anims.play("walk-right", true); },
    onUpdate() {
      if (!cursors.right.isDown) return "idle";
      player.x += speed;
      return "walk-right";
    },
    onExit() {}
  },
  "walk-up": {
    onEnter() { player.anims.play("walk-up", true); },
    onUpdate() {
      if (!cursors.up.isDown) return "idle";
      player.y -= speed;
      return "walk-up";
    },
    onExit() {}
  },
  "walk-down": {
    onEnter() { player.anims.play("walk-down", true); },
    onUpdate() {
      if (!cursors.down.isDown) return "idle";
      player.y += speed;
      return "walk-down";
    },
    onExit() {}
  },

  "run-left": {
    onEnter() { player.anims.play("walk-left", true); },
    onUpdate() {
      if (!cursors.left.isDown || !keys.shift.isDown) return "idle";
      player.x -= runSpeed;
      return "run-left";
    },
    onExit() {}
  },
  "run-right": {
    onEnter() { player.anims.play("walk-right", true); },
    onUpdate() {
      if (!cursors.right.isDown || !keys.shift.isDown) return "idle";
      player.x += runSpeed;
      return "run-right";
    },
    onExit() {}
  },
  "run-up": {
    onEnter() { player.anims.play("walk-up", true); },
    onUpdate() {
      if (!cursors.up.isDown || !keys.shift.isDown) return "idle";
      player.y -= runSpeed;
      return "run-up";
    },
    onExit() {}
  },
  "run-down": {
    onEnter() { player.anims.play("walk-down", true); },
    onUpdate() {
      if (!cursors.down.isDown || !keys.shift.isDown) return "idle";
      player.y += runSpeed;
      return "run-down";
    },
    onExit() {}
  },

  "cast-spell": {
    onEnter() { player.anims.play("cast-spell", true); },
    onUpdate() {
      return (keys.shift.isDown && !(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown)) ? "cast-spell" : "idle";
    },
    onExit() {}
  },

  attack: {
    onEnter() { player.anims.play("attack", true); },
    onUpdate() {
      return keys.space.isDown ? "attack" : "idle";
    },
    onExit() {}
  },

  "play-flute": {
    onEnter() { player.anims.play("play-flute", true); },
    onUpdate() {
      return keys.ctrl.isDown ? "play-flute" : "idle";
    },
    onExit() {}
  }
};

function preload() {
  // Load player spritesheet with all animations
  this.load.spritesheet("player", "https://i.imgur.com/7CU9Ky9.png", {
    frameWidth: 120,
    frameHeight: 120
  });

  // Load background spritesheet
  this.load.spritesheet("background", "https://i.imgur.com/yourBackground.png", {
    frameWidth: 800,
    frameHeight: 600
  });

  // Load coin spritesheet for collectible
  this.load.spritesheet("coin", "https://i.imgur.com/DP7vyRJ.png", {
    frameWidth: 32,
    frameHeight: 32
  });
}

function create() {
  // Add background sprite and animate it slowly
  background = this.add.sprite(400, 300, "background");
  this.anims.create({
    key: "bg-anim",
    frames: this.anims.generateFrameNumbers("background", { start: 0, end: 9 }),
    frameRate: 2,
    repeat: -1
  });
  background.anims.play("bg-anim");

  // Create player sprite and keyboard input
  player = this.add.sprite(400, 400, "player");
  cursors = this.input.keyboard.createCursorKeys();
  keys = {
    space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
    ctrl: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
  };

  // Player animations
  this.anims.create({
    key: "walk-left",
    frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "walk-right",
    frames: this.anims.generateFrameNumbers("player", { start: 18, end: 23 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "walk-up",
    frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "walk-down",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "cast-spell",
    frames: this.anims.generateFrameNumbers("player", { start: 24, end: 29 }),
    frameRate: 12,
    repeat: -1
  });
  this.anims.create({
    key: "attack",
    frames: this.anims.generateFrameNumbers("player", { start: 30, end: 35 }),
    frameRate: 15,
    repeat: -1
  });
  this.anims.create({
    key: "play-flute",
    frames: this.anims.generateFrameNumbers("player", { start: 36, end: 41 }),
    frameRate: 8,
    repeat: -1
  });

  // Create coin collectible sprite and animation
  coin = this.add.sprite(600, 500, "coin").setInteractive();
  this.anims.create({
    key: "coin-spin",
    frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  coin.anims.play("coin-spin");

  // Click to pick up coin (hide coin)
  coin.on("pointerdown", () => {
    coin.visible = false;
  });

  // Start in idle state
  currentState = "idle";
  states[currentState].onEnter();
}

function update() {
  // Update player state machine every frame
  const nextState = states[currentState].onUpdate();
  if (nextState !== currentState) {
    states[currentState].onExit();
    states[nextState].onEnter();
    currentState = nextState;
  }
}
