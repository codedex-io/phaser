// Happy Place 🏖️
// Codédex

 // Config object for the game
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#87CEEB", // sky blue
    scene: { preload, create, update }
  };

  const game = new Phaser.Game(config);

  let player;
  let cursors;

  function preload() {
    // Load assets
    this.load.image("bg", "https://i.imgur.com/Joul9GG.png"); 
    this.load.image("player", "https://i.imgur.com/wMj8P7M.gif"); 
    this.load.image("coin", "https://i.imgur.com/Jjz7F1z.png"); 
  }

  function create() {
    // Add background
    this.add.image(400, 300, "bg").setScale(1.5);

    // Add player sprite
    player = this.add.image(400, 500, "player").setScale(0.5);

    // Enable cursor keys
    cursors = this.input.keyboard.createCursorKeys();

    // Add mouse click event to place coins
    this.input.on("pointerdown", function (pointer) {
      this.add.image(pointer.x, pointer.y, "coin").setScale(0.5);
    }, this);
  }

  function update() {
    // Move player with arrow keys
    if (cursors.left.isDown) {
      player.x -= 5;
    }
    if (cursors.right.isDown) {
      player.x += 5;
    }
    if (cursors.up.isDown) {
      player.y -= 5;
    }
    if (cursors.down.isDown) {
      player.y += 5;
    }
  }