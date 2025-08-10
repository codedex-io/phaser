// State Object 📍
// Codédex

const states = {
  // Idle state: robot stands still and stops animations
  idle: {
    onEnter() {
      // Stop any playing animation to appear frozen/idle
      robot.anims.stop();
    },
    onUpdate() {
      // Check if any arrow key is pressed and switch to corresponding walking state
      if (cursors.left.isDown) return "walk-left";
      if (cursors.right.isDown) return "walk-right";
      if (cursors.down.isDown) return "walk-down";
      if (cursors.up.isDown) return "walk-up";
      
      // If no key pressed, stay in idle state
      return "idle";
    },
    onExit() {
      // No special cleanup needed when leaving idle state yet
    }
  },

  // Walk Left state: plays walking-left animation and moves robot left
  "walk-left": {
    onEnter() {
      // Start looping the "walk-left" animation
      robot.anims.play("walk-left", true);
    },
    onUpdate() {
      // If left arrow released, transition back to idle
      if (!cursors.left.isDown) return "idle";
      
      // Move robot left by decreasing x position
      robot.x -= speed;
      
      // Stay in walk-left state
      return "walk-left";
    },
    onExit() {
      // No special cleanup when exiting walk-left yet
    }
  },

  // Walk Right state: plays walking-right animation and moves robot right
  "walk-right": {
    onEnter() {
      robot.anims.play("walk-right", true);
    },
    onUpdate() {
      if (!cursors.right.isDown) return "idle";
      robot.x += speed;
      return "walk-right";
    },
    onExit() {}
  },

  // Walk Down state: plays walking-down animation and moves robot down
  "walk-down": {
    onEnter() {
      robot.anims.play("walk-down", true);
    },
    onUpdate() {
      if (!cursors.down.isDown) return "idle";
      robot.y += speed;
      return "walk-down";
    },
    onExit() {}
  },

  // Walk Up state: plays walking-up animation and moves robot up
  "walk-up": {
    onEnter() {
      robot.anims.play("walk-up", true);
    },
    onUpdate() {
      if (!cursors.up.isDown) return "idle";
      robot.y -= speed;
      return "walk-up";
    },
    onExit() {}
  }
};
