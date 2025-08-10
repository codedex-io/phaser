// State Complete ✅
// Codédex

const config = {
  type: Phaser.AUTO,             
  width: 800,                   
  height: 600,                  
  backgroundColor: "#a0a0a0",   
  scene: {
    preload,                    
    create,                     
    update                     
  }
};

const game = new Phaser.Game(config);

let foxGirl;                    // The player sprite
let cursors;                    // Keyboard input (arrow keys + shift)
let speed = 3;                  // Normal walking speed
let runSpeed = 6;               // Running speed (with Shift)
let currentState;               // Current animation/movement state

// Define all states and their behavior in a state machine object
const states = {
  idle: {
    onEnter() {
      foxGirl.anims.stop();    // Stop any playing animation
      foxGirl.setFrame(0);     // Show default idle frame
    },
    onUpdate() {
      // Check for running states first if Shift is held
      if (cursors.shift.isDown) {
        if (cursors.left.isDown) return "run-left";
        if (cursors.right.isDown) return "run-right";
        if (cursors.up.isDown) return "run-up";
        if (cursors.down.isDown) return "run-down";
      } else {
        // If not running, check walking states
        if (cursors.left.isDown) return "walk-left";
        if (cursors.right.isDown) return "walk-right";
        if (cursors.up.isDown) return "walk-up";
        if (cursors.down.isDown) return "walk-down";
      }
      return "idle";            // No keys pressed: stay idle
    },
    onExit() {
      // Nothing needed on exit from idle currently
    }
  },

  "walk-left": {
    onEnter() {
      foxGirl.anims.play("walk-left", true);  // Play walking left animation
    },
    onUpdate() {
      if (!cursors.left.isDown) return "idle"; // If left key released, go idle
      foxGirl.x -= speed;                      // Move sprite left
      return "walk-left";                      // Stay in this state
    },
    onExit() {}
  },

  "walk-right": {
    onEnter() {
      foxGirl.anims.play("walk-right", true);
    },
    onUpdate() {
      if (!cursors.right.isDown) return "idle";
      foxGirl.x += speed;
      return "walk-right";
    },
    onExit() {}
  },

  "walk-up": {
    onEnter() {
      foxGirl.anims.play("walk-up", true);
    },
    onUpdate() {
      if (!cursors.up.isDown) return "idle";
      foxGirl.y -= speed;
      return "walk-up";
    },
    onExit() {}
  },

  "walk-down": {
    onEnter() {
      foxGirl.anims.play("walk-down", true);
    },
    onUpdate() {
      if (!cursors.down.isDown) return "idle";
      foxGirl.y += speed;
      return "walk-down";
    },
    onExit() {}
  },

  // Running states use same animations but move faster
  "run-left": {
    onEnter() {
      foxGirl.anims.play("walk-left", true);
    },
    onUpdate() {
      if (!cursors.left.isDown || !cursors.shift.isDown) return "idle";
      foxGirl.x -= runSpeed;
      return "run-left";
    },
    onExit() {}
  },

  "run-right": {
    onEnter() {
      foxGirl.anims.play("walk-right", true);
    },
    onUpdate() {
      if (!cursors.right.isDown || !cursors.shift.isDown) return "idle";
      foxGirl.x += runSpeed;
      return "run-right";
    },
    onExit() {}
  },

  "run-up": {
    onEnter() {
      foxGirl.anims.play("walk-up", true);
    },
    onUpdate() {
      if (!cursors.up.isDown || !cursors.shift.isDown) return "idle";
      foxGirl.y -= runSpeed;
      return "run-up";
    },
    onExit() {}
  },

  "run-down": {
    onEnter() {
      foxGirl.anims.play("walk-down", true);
    },
    onUpdate() {
      if (!cursors.down.isDown || !cursors.shift.isDown) return "idle";
      foxGirl.y += runSpeed;
      return "run-down";
    },
    onExit() {}
  }
};

function preload() {
  // Load the foxGirl spritesheet with 120x120 frame size
  this.load.spritesheet("foxGirl", "https://i.imgur.com/7CU9Ky9.png", {
    frameWidth: 120,
    frameHeight: 120
  });
}

function create() {
  // Create the foxGirl sprite at position (100, 100)
  foxGirl = this.add.sprite(100, 100, "foxGirl");

  // Enable keyboard cursor keys and Shift
  cursors = this.input.keyboard.createCursorKeys();

  // Create walking animations for four directions
  this.anims.create({
    key: "walk-left",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 12, end: 17 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "walk-right",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 18, end: 23 }),
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
    key: "walk-down",
    frames: this.anims.generateFrameNumbers("foxGirl", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  // Set the initial state to idle and call its onEnter handler
  currentState = "idle";
  states[currentState].onEnter();
}

function update() {
  // Get the next state from current state's onUpdate method
  const nextState = states[currentState].onUpdate();

  // If state has changed, run exit and enter handlers and update currentState
  if (nextState !== currentState) {
    states[currentState].onExit();
    states[nextState].onEnter();
    currentState = nextState;
  }
}
