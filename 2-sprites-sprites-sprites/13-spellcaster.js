// Spellcaster ✨
// Codédex

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: { preload, create, update }
};

let player;
let cursors;
let speed = 3;
let currentState;
let isCasting = false;

const game = new Phaser.Game(config);

// FSM states
const states = {
  frozen: {
    onEnter() {
      if (player) player.anims.stop();
    },
    onUpdate() {
      if (isCasting) return "cast-" + player.direction;
      if (cursors.left.isDown) return "walk-left";
      if (cursors.right.isDown) return "walk-right";
      if (cursors.up.isDown) return "walk-up";
      if (cursors.down.isDown) return "walk-down";
      return "frozen";
    },
    onExit() {}
  },

  "walk-left": createWalkState("left", -1, 0),
  "walk-right": createWalkState("right", 1, 0),
  "walk-up": createWalkState("up", 0, -1),
  "walk-down": createWalkState("down", 0, 1),
  "cast-left": createCastState("left"),
  "cast-right": createCastState("right"),
  "cast-up": createCastState("up"),
  "cast-down": createCastState("down")
};

// Walk state helper
function createWalkState(dir, dx, dy) {
  return {
    onEnter() { player.direction = dir; },
    onUpdate() {
      if (isCasting) return "cast-" + player.direction;

      let keyHeld = false;

      if (dir === "left" && cursors.left.isDown) { player.x += dx * speed; keyHeld = true; }
      if (dir === "right" && cursors.right.isDown) { player.x += dx * speed; keyHeld = true; }
      if (dir === "up" && cursors.up.isDown) { player.y += dy * speed; keyHeld = true; }
      if (dir === "down" && cursors.down.isDown) { player.y += dy * speed; keyHeld = true; }

      // Start animation only while key is held
      if (keyHeld) player.anims.play("walk-" + dir, true);
      else player.anims.stop(); // freeze if key released

      // Switch to another direction if another key pressed
      if (cursors.left.isDown && dir !== "left") return "walk-left";
      if (cursors.right.isDown && dir !== "right") return "walk-right";
      if (cursors.up.isDown && dir !== "up") return "walk-up";
      if (cursors.down.isDown && dir !== "down") return "walk-down";

      if (!keyHeld) return "frozen"; // go to frozen state if no key held

      return "walk-" + dir;
    },
    onExit() { player.anims.stop(); }
  };
}

// Cast state helper
function createCastState(dir) {
  return {
    onEnter() {
      isCasting = true;
      player.direction = dir;
      player.anims.play("cast-" + dir, true);
      player.once("animationcomplete", () => { isCasting = false; });
    },
    onUpdate() {
      if (isCasting) return "cast-" + dir;

      // Resume walking if key held
      if (cursors.left.isDown) return "walk-left";
      if (cursors.right.isDown) return "walk-right";
      if (cursors.up.isDown) return "walk-up";
      if (cursors.down.isDown) return "walk-down";

      // Freeze on last cast frame
      return "frozen";
    },
    onExit() { player.anims.stop(); }
  };
}

// Preload assets
function preload() {
  this.load.image("background", "https://i.imgur.com/EFTvjBF.png");

  const dirs = ["down","up","right","left"];
  dirs.forEach(dir => {
    this.load.spritesheet("walk-" + dir, `https://i.imgur.com/${{
      down:"nbjlMve", up:"0cysHR2", right:"HU3w19x", left:"XXAjsBR"
    }[dir]}.png`, { frameWidth: 256, frameHeight: 256 });

    this.load.spritesheet("cast-" + dir, `https://i.imgur.com/${{
      down:"gPlxrQT", up:"JhpnwOz", right:"C2l0ulK", left:"nlvm4em"
    }[dir]}.png`, { frameWidth: 256, frameHeight: 256 });
  });
}

// Create scene
function create() {
  this.add.image(0,0,"background").setOrigin(0,0);

  player = this.add.sprite(400,300,"walk-down");
  player.direction = "down";

  cursors = this.input.keyboard.createCursorKeys();

  ["down","up","right","left"].forEach(dir => {
    this.anims.create({
      key: "walk-" + dir,
      frames: this.anims.generateFrameNumbers("walk-" + dir, { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "cast-" + dir,
      frames: this.anims.generateFrameNumbers("cast-" + dir, { start: 0, end: 22 }),
      frameRate: 10,
      repeat: 0
    });
  });

  // Start in frozen state
  currentState = "frozen";
  states[currentState].onEnter();

  // Spacebar triggers casting
  this.input.keyboard.on("keydown-SPACE", () => {
    if (!isCasting) {
      const castState = "cast-" + player.direction;
      currentState = castState;
      states[currentState].onEnter();
    }
  });
}

// Update scene each frame
function update() {
  const nextState = states[currentState].onUpdate();
  if (nextState && nextState !== currentState) {
    states[currentState].onExit();
    states[nextState].onEnter();
    currentState = nextState;
  }
}
