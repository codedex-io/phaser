// Spellcaster ✨
// Codédex

let player;
let cursors;
let speed = 3;
let isCasting = false;
let currentState;
let background;

const states = {
  idle: {
    onEnter() {
      // Stop any current animation when idle
      player.anims.stop();
    },
    onUpdate() {
      // If casting spell, switch to casting animation for current direction
      if (isCasting) return "cast-spell-" + player.direction;
      // Check movement keys to change state
      if (cursors.left.isDown) return "walk-left";
      if (cursors.right.isDown) return "walk-right";
      if (cursors.up.isDown) return "walk-up";
      if (cursors.down.isDown) return "walk-down";
      // Otherwise remain idle
      return "idle";
    },
    onExit() {}
  },

  "walk-left": {
    onEnter() {
      // Change texture to left walk spritesheet and play walk-left animation
      player.setTexture("walk-left");
      player.anims.play("walk-left", true);
      player.direction = "left"; // Store current facing direction
    },
    onUpdate() {
      // If casting, switch to cast-spell-left state
      if (isCasting) return "cast-spell-left";
      // If left key released, return to idle
      if (!cursors.left.isDown) return "idle";
      // Move player left
      player.x -= speed;
      return "walk-left";
    },
    onExit() {}
  },

  "walk-right": {
    onEnter() {
      player.setTexture("walk-right");
      player.anims.play("walk-right", true);
      player.direction = "right";
    },
    onUpdate() {
      if (isCasting) return "cast-spell-right";
      if (!cursors.right.isDown) return "idle";
      player.x += speed;
      return "walk-right";
    },
    onExit() {}
  },

  "walk-up": {
    onEnter() {
      player.setTexture("walk-up");
      player.anims.play("walk-up", true);
      player.direction = "up";
    },
    onUpdate() {
      if (isCasting) return "cast-spell-up";
      if (!cursors.up.isDown) return "idle";
      player.y -= speed;
      return "walk-up";
    },
    onExit() {}
  },

  "walk-down": {
    onEnter() {
      player.setTexture("walk-down");
      player.anims.play("walk-down", true);
      player.direction = "down";
    },
    onUpdate() {
      if (isCasting) return "cast-spell-down";
      if (!cursors.down.isDown) return "idle";
      player.y += speed;
      return "walk-down";
    },
    onExit() {}
  },

  "cast-spell-left": {
    onEnter() {
      // Change texture and play casting animation facing left
      player.setTexture("cast-spell-left");
      player.anims.play("cast-spell-left");
      // After animation completes, stop casting
      player.once("animationcomplete-cast-spell-left", () => {
        isCasting = false;
      });
    },
    onUpdate() {
      // Stay in casting state until animation finishes
      return "cast-spell-left";
    },
    onExit() {}
  },

  "cast-spell-right": {
    onEnter() {
      player.setTexture("cast-spell-right");
      player.anims.play("cast-spell-right");
      player.once("animationcomplete-cast-spell-right", () => {
        isCasting = false;
      });
    },
    onUpdate() {
      return "cast-spell-right";
    },
    onExit() {}
  },

  "cast-spell-up": {
    onEnter() {
      player.setTexture("cast-spell-up");
      player.anims.play("cast-spell-up");
      player.once("animationcomplete-cast-spell-up", () => {
        isCasting = false;
      });
    },
    onUpdate() {
      return "cast-spell-up";
    },
    onExit() {}
  },

  "cast-spell-down": {
    onEnter() {
      player.setTexture("cast-spell-down");
      player.anims.play("cast-spell-down");
      player.once("animationcomplete-cast-spell-down", () => {
        isCasting = false;
      });
    },
    onUpdate() {
      return "cast-spell-down";
    },
    onExit() {}
  }
};

function preload() {
  // Load background image; replace this URL with your preferred background
  this.load.image("background", "https://i.imgur.com/3e5XyI6.png");

  // Load walking spritesheets, each frame 256x256 pixels
  this.load.spritesheet("walk-down", "https://i.imgur.com/nbjlMve.png", {
    frameWidth: 256,
    frameHeight: 256
  });
  this.load.spritesheet("walk-up", "https://i.imgur.com/0cysHR2.png", {
    frameWidth: 256,
    frameHeight: 256
  });
  this.load.spritesheet("walk-right", "https://i.imgur.com/HU3w19x.png", {
    frameWidth: 256,
    frameHeight: 256
  });
  this.load.spritesheet("walk-left", "https://i.imgur.com/XXAjsBR.png", {
    frameWidth: 256,
    frameHeight: 256
  });

  // Load casting spell spritesheets, also 256x256 pixels per frame
  this.load.spritesheet("cast-spell-down", "https://i.imgur.com/gPlxrQT.png", {
    frameWidth: 256,
    frameHeight: 256
  });
  this.load.spritesheet("cast-spell-up", "https://i.imgur.com/JhpnwOz.png", {
    frameWidth: 256,
    frameHeight: 256
  });
  this.load.spritesheet("cast-spell-right", "https://i.imgur.com/C2l0ulK.png", {
    frameWidth: 256,
    frameHeight: 256
  });
  this.load.spritesheet("cast-spell-left", "https://i.imgur.com/nlvm4em.png", {
    frameWidth: 256,
    frameHeight: 256
  });
}

function create() {
  // Add background image at top-left corner
  background = this.add.image(0, 0, "background").setOrigin(0, 0);

  // Create player sprite starting facing down
  player = this.add.sprite(400, 300, "walk-down");
  player.direction = "down"; // Track player direction for casting animations

  // Create cursor keys for input
  cursors = this.input.keyboard.createCursorKeys();

  // Create walking animations for all directions
  ["down", "up", "right", "left"].forEach(dir => {
    this.anims.create({
      key: "walk-" + dir,
      frames: this.anims.generateFrameNumbers("walk-" + dir, { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  });

  // Create casting spell animations for all directions
  ["down", "up", "right", "left"].forEach(dir => {
    this.anims.create({
      key: "cast-spell-" + dir,
      frames: this.anims.generateFrameNumbers("cast-spell-" + dir, { start: 0, end: 22 }),
      frameRate: 10,
      repeat: 0
    });
  });

  // Start in idle state
  currentState = "idle";
  states[currentState].onEnter();

  // Listen for spacebar to start casting spell
  this.input.keyboard.on("keydown-SPACE", () => {
    if (!isCasting) {
      isCasting = true;
    }
  });
}

function update() {
  // Check next state based on input and current conditions
  const nextState = states[currentState].onUpdate();

  // If state changes, run exit and enter handlers
  if (nextState !== currentState) {
    states[currentState].onExit();
    states[nextState].onEnter();
    currentState = nextState;
  }
}
