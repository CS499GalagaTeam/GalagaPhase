Game = function(game) {};



var entranceTimer = 0;
var G1 = [];
var G2 = [];
var G3 = [];
var G4 = [];
var G5 = [];
var currentEnemies = [];

var currentScore = 0;



var cnt = 0;
var group1EntranceComplete = false;
var group2EntranceComplete = false;
//var mainTime = 0;


Phaser.GameObjectFactory.prototype.enemy = function(x,y,xPix,yPix,enemyNum) {
	enemy = new Enemy(this.game,x,y,xPix,yPix,enemyNum);
	currentEnemies.push(enemy);
	//return this.game.add.existing(new Enemy(this.game,x,y,xPix,yPix,enemyNum));
	return this.game.add.existing(enemy);

}


  Game.prototype.preload = function() {

	game.load.image('galaga', './assets/images/galaga.png');
	game.load.image('bullet', './assets/images/bullet.png');
	game.load.spritesheet('enemy1', './assets/images/enemy1.png',30,20);
	game.load.spritesheet('enemy2', './assets/images/enemy2.png',30,20);
	game.load.spritesheet('enemy3', './assets/images/enemy3.png',36,32);
	game.load.spritesheet('enemy3Hit', './assets/images/enemy3Hit.png',36,32);
	game.load.image('explosion', './assets/images/explosion.png');
	game.load.spritesheet('pixel','./assets/images/dot.png');
	game.load.audio('pewpew', './assets/sounds/pewpew.wav');

  }

  Game.prototype.create = function() {

		this.score_style = {
      font: "20px Arial",
      fill: "#ff0000",
      align: "center"
    };

		var mid_x = this.game.width / 2;

		score_text = this.game.add.text(mid_x, 50, "SCORE: " +currentScore , this.score_style);
		score_text.anchor.set(0.5, 0.5);

		game.physics.startSystem(Phaser.Physics.ARCADE);
			pewpew = game.add.audio('pewpew');
    //creates player
    player = game.add.sprite(0.75 * 600, 600 - 50, 'galaga');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    // allows player to fire 2 bullets
    bullet = game.add.weapon(2, 'bullet');
		bullet.bullets.enableBody = true;
		game.physics.enable(bullet.bullets, Phaser.Physics.ARCADE);


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
	enemies.enableBody = true;
	enemies.enableBodyType = Phaser.Physics.ARCADE;

	enemies2 = game.add.group();
	enemies2.enableBody = true;

	enemies3 = game.add.group();
	enemies3.enableBody = true;

	enemies4 = game.add.group();
	enemies4.enableBody = true;

	enemies5 = game.add.group();
	enemies5.enableBody = true;

	//game.physics.arcade.enable(enemies);


	// locations for the groups of enemies to fly to
	var group1PixelLocations = {

		'x' : [game.width/2,game.width/2-30,game.width/2,game.width/2-30,
		game.width/2,game.width/2-30,game.width/2,game.width/2-30],
		'y' : [(game.height/2)-30,(game.height/2)-30,(game.height/2)-60,(game.height/2)-60,
		(game.height/2)-90,(game.height/2)-90,(game.height/2)-120,(game.height/2)-120],

	};


	var group2PixelLocations = {

		'x': [(game.width/2)-60,(game.width/2)-60,(game.width/2)-60,(game.width/2)-30,
		(game.width/2),(game.width/2)+30,(game.width/2)+30,(game.width/2)+30],
		'y': [(game.height/2)-90,(game.height/2)-120,(game.height/2)-150,(game.height/2)-150,
		(game.height/2)-150,(game.height/2)-150,(game.height/2)-120,(game.height/2)-90],

	};

	var group3PixelLocations = {

		'x':[(game.width/2)-90,(game.width/2)-90,(game.width/2)-120,(game.width/2)-120,
		(game.width/2)+60,(game.width/2)+60,(game.width/2)+90,(game.width/2)+90],
		'y':[(game.height/2)-90,(game.height/2)-120,(game.height/2)-120,(game.height/2)-90,
		(game.height/2)-90,(game.height/2)-120,(game.height/2)-120,(game.height/2)-90],

	};

	var group4PixelLocations = {

		'x':[(game.width/2)-60,(game.width/2)-60,(game.width/2)-90,(game.width/2)-90,
		(game.width/2)+30,(game.width/2)+30,(game.width/2)+60,(game.width/2)+60],
		'y':[(game.height/2)-30,(game.height/2)-60,(game.height/2)-60,(game.height/2)-30,
		(game.height/2)-30,(game.height/2)-60,(game.height/2)-60,(game.height/2)-30],

	};

	var group5PixelLocations = {

		'x':[(game.width/2)-120,(game.width/2)-120,(game.width/2)-150,(game.width/2)-150,
		(game.width/2)+90,(game.width/2)+90,(game.width/2)+120,(game.width/2)+120],
		'y':[(game.height/2)-30,(game.height/2)-60,(game.height/2)-60,(game.height/2)-30,
		(game.height/2)-30,(game.height/2)-60,(game.height/2)-60,(game.height/2)-30],

	};




	//create enemies
	//group 1

	for (var i = 0; i < 8; i = i+2) {

		if ( i == 0 || i == 1 || i == 2 || i == 3) {
		enemies.create(game.add.enemy(game.width/1.33,0,group1PixelLocations.x[i],group1PixelLocations.y[i],1));
		//create another enemy object with opposite coordinates
		enemies.create(game.add.enemy(game.width/4,0,group1PixelLocations.x[i+1],group1PixelLocations.y[i+1],1));
	}
		else {
		enemies.create(game.add.enemy(game.width/1.33,0,group1PixelLocations.x[i],group1PixelLocations.y[i],0));
		//create another enemy object with opposite coordinates
		enemies.create(game.add.enemy(game.width/4,0,group1PixelLocations.x[i+1],group1PixelLocations.y[i+1],0));
		}
	}
	G1 = currentEnemies;
	currentEnemies = [];



	//this.createEnemy();


	// group 2

	for (var i = 0; i < 8; i++) {


		if (i == 0 || i == 1 || i == 6 || i == 7)
		enemies2.create(game.add.enemy(0,game.height-100,group2PixelLocations.x[i],group2PixelLocations.y[i],0));
		else
		enemies2.create(game.add.enemy(0,game.height-100,group2PixelLocations.x[i],group2PixelLocations.y[i],2));

	}

	G2 = currentEnemies;
	currentEnemies = [];


	that_g_array = [G1, G2];
//game.physics.arcade.overlap(bullet, enemies, null,this)
/*
	//group 3
	for (var i = 0; i < 8; i++)
		enemies3.create(game.add.enemy(800,game.height-100,group3PixelLocations.x[i],group3PixelLocations.y[i],0));
	//group 4
	for (var i = 0; i < 8; i++)
		enemies4.create(game.add.enemy(game.width/2,0,group4PixelLocations.x[i],group4PixelLocations.y[i],1));
	//group 5
	for (var i = 0; i < 8; i++)
		enemies5.create(game.add.enemy(game.width/2,0,group5PixelLocations.x[i],group5PixelLocations.y[i],1));


*/

//game.time.events.add(100, this.createEnemy(), this);
//mainTime = game.time.now + 10000;
}


Game.prototype.update = function() {

 	this.playerMovement();


 	if (!group1EntranceComplete) {
 	 if (game.time.now > entranceTimer) {
 	 		if (cnt < G1.length){
            	this.flightEntrance1(cnt);
            	cnt++;
        	}
        	if (cnt >= G1.length) {
        		//alert(cnt);
        		currentEnemies = [];
        		entranceTimer = 0;
        		cnt = 0;
        		group1EntranceComplete = true;
        	}
        }
    }

    if(!group2EntranceComplete && game.time.totalElapsedSeconds() > 4) {


    	if (cnt < G2.length) {
    		this.flightEntrance2(cnt);
    		cnt++;
    	}
    	if (cnt > G2.length) {
    		currentEnemies = [];
    		entranceTimer = 0;
    		cnt = 0;
    		group2EntranceComplete = true;
    	}
    }

bullet.bullets.children.forEach(function(bu){
 that_g_array.forEach(function(enms){
	 enms.forEach(function(enm){
		 game.physics.arcade.overlap(bu, enm.getEnemy(), collisionHandler);
	 })

 })
 })
	//G1.forEach(function(enm){
		// if (game.physics.arcade.collide(bullet, enemies, this.collisionHandler)) {
		//
		// 				console.log("YEAH!")
		// }
	//})



}
var collisionHandler = function(bu, en) {
	bu.kill();
	en.kill();
	currentScore += 20
	score_text.setText("SCORE: "+currentScore);
}

Game.prototype.processHandler = function(bu, en) {
	return true;
}

Game.prototype.playerMovement = function() {

    // Reset the players velocity (movement)
    player.body.velocity.x = 0;


	if (keys.left.isDown) {
		// Move to the left
		player.body.velocity.x = -150;
	}
	else if (keys.right.isDown) {
		// Move to the right
		player.body.velocity.x = 150;
		//G2[0].flyAttack(function(){});
	}
	else  {
		//ship is idle
	}
}

/* Entrance for the first group */
Game.prototype.flightEntrance1 = function(c) {

	G1[c].group1Path();
	entranceTimer = game.time.now + 25;

}

Game.prototype.flightEntrance2 = function(c) {
	G2[c].group2Path();
	entranceTimer = game.time.now + 25;
}

Game.prototype.shootFunction = function() {
	bullet.fire();
}

Game.prototype.enemyToFlyIn = function() {
    var aliveArray = [];

    this.enemyGroups.forEach(function(group) {
      group.forEachAlive(function(enemy) {
        var r = Math.floor((Math.random() * 3) + 1);
        if( r % 3 === 0) aliveArray.push(enemy);
      });
  });

  return aliveArray;
}
