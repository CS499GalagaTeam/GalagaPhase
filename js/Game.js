Game = function(game) {

}


Phaser.GameObjectFactory.prototype.enemy = function(x, y, xPix, yPix) {

	return this.game.add.existing(new Enemy(this.game,x,y,xPix, yPix) );
}

Game.prototype = {

  preload:function() {

	game.load.image('galaga', './assets/images/galaga.png');
	game.load.image('bullet', './assets/images/bullet.png');
	game.load.spritesheet('enemy1', './assets/images/enemy1.png',30,20);
	game.load.spritesheet('enemy2', './assets/images/enemy2.png',30,20);
	game.load.spritesheet('enemy3', './assets/images/enemy3.png',36,20);
	game.load.spritesheet('enemy3Hit', './assets/images/enemy3Hit.png',36,20);
	game.load.image('explosion', './assets/images/explosion.png');
	game.load.spritesheet('pixel','./assets/images/dot.png');
	game.load.audio('pewpew', './assets/sounds/pewpew.wav');

  },

  create: function() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	pewpew = game.add.audio('pewpew');

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
	shootButton.onDown.add(this.shootFunction);
	bullet.onFire.add(function(){pewpew.play()});

	enemies = game.add.group();
	//enemies.classType = Enemy;
	enemies.enableBody = true;



	// locations for the first group of enemies to fly in
	var group1PixelLocations = {
		'x' : [game.width/2,game.width/2-30,game.width/2,game.width/2-30,game.width/2,game.width/2-30],
		'y' : [(game.height/2)-30,(game.height/2)-60,(game.height/2)-90,(game.height/2)-120,(game.height/2)-150],
		
	};
	
	//create enemies
	var timeCheck;
	for (var i = 0; i < 5; i++) {
		/*timeCheck = game.time.now;*/
		// I have the enemy flying a path and then following the green pixel
		// but it's currently not working because
		// the last two parameters are undefined when passed in
		enemies.create(game.add.enemy(game.width/1.33,0,group1PixelLocations.x[i],group1PixelLocations.y[i]));
		//create another enemy object with opposite coordinates
	}
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
},

shootFunction: function() {
	bullet.fire()
}

};
