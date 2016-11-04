var Game = function(game) {

	this.game = game;
	this.player = null;
	this.bullet = null;
	this.keys = null;
	this.shootButton = null;
	this.pewpew = null;

}

Game.prototype = {

  preload:function() {

	game.load.image('background', './assets/images/background.jpg');
	game.load.image('galaga', './assets/images/galaga.png');
	game.load.image('bullet', './assets/images/bullet.png');
	game.load.image('enemy1', './assets/images/enemy1.png');
	game.load.image('enemy2', './assets/images/enemy2.png');
	game.load.image('explosion', './assets/images/explosion.png');

	game.load.audio('pewpew', './assets/sounds/pewpew.wav');
},

  create: function() {

	//game.add.sprite(0,0, 'background');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	pewpew =  game.add.audio('pewpew');

	//creates player
	player = game.add.sprite(0.45*600,600-50,'galaga');
	game.physics.arcade.enable(player);

	// allows player to fire 2 bullets
	bullet = game.add.weapon(2,'bullet');

	// when bullet leaves the screen, it will be destroyed
	bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

	//offset rotation:
    bullet.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    bullet.bulletSpeed = 400;

    //  Tell the bullet to track the 'player' Sprite, offset by 16px horizontally, 0 vertically
    bullet.trackSprite(player, 16, 0);

	//enabling keyboard use
	keys = game.input.keyboard.createCursorKeys();
	shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

},

 update: function() {
 	this.playerMovement();
},

playerMovement: function() {

	// Reset the players velocity (movement)
	player.body.velocity.x = 0;

	if (keys.left.isDown) {
		// Move to the left
		player.body.velocity.x = -150;
	}
	else if (keys.right.isDown) {
		// Move to the right
		player.body.velocity.x = 150;
	}
	else  {
		//ship is idle
	}
	//shooting the bullet
	if (shootButton.isDown) {
		pewpew.play();
		bullet.fire();
	}
}
};
