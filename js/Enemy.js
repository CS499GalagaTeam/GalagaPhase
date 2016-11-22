var Enemy = function(game,x,y,xPix,yPix) {
	Phaser.Sprite.call(this,game,x,y,'');

	// these two variables are undefined
	alert(xPix + " " + yPix);
	this.create();
	
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

var completed = false;
Enemy.prototype.preload = function() {

}

Enemy.prototype.create = function() {

		var enemySprites = ['enemy1','enemy2','enemy3'];
		// enemy sprite and its animation
		this.enemy = game.add.sprite(this.x,this.y,enemySprites[0]);
		this.enemy.anchor.set = 0.5;
		this.enemy.animations.add(enemySprites[0],null,10,true);
		this.enemy.animations.play(enemySprites[0]);

		//This will be tracked by the enemy sprite
		//will be set to invisible
		this.pixel = game.add.sprite(this.xPix,this.yPix,'pixel');
		//this.pixel.visible = false;
		/*alert(this.xPix+ ' ' + this.yPix);*/

		game.physics.arcade.enable(this.enemy);
		game.physics.arcade.enable(this.pixel);	
		
		this.sideTween();
		this.group1Path();
		
}


Enemy.prototype.update = function() { 

		if (!this.exists)	return;

		if (completed)
		game.physics.arcade.moveToObject(this.enemy,this.pixel,100);
}



/*the path of pixel
moves back and forth
represents the movement of enemy sprites
while enemies are flying in*/
Enemy.prototype.sideTween = function() {

		this.tween = game.add.tween(this.pixel).to({x: this.xPix + 400}, 2000, null,-1,true);
		this.tween.yoyo(true,0,0);
		this.tween.repeat(-1);
		this.tween.start();
}

Enemy.prototype.isComplete = function() {
	completed = true;
}

/**/
Enemy.prototype.expandTween = function() {

}

//path of the first group
Enemy.prototype.group1Path = function() {

	// reference point for x coordinate
	var p = game.width/1.33;
	
	var pts = {
		'x': [p,p,p,p-50,p-130,p-110,p+110,p+110,p-30,p-90,p-200],
		'y': [100,200,300,300,230,10,10,180,450,500,300],
	}


	//this.displayPath(pts);
	

	this.tween = game.add.tween(this.enemy).to(
	{
          x: [ pts.x[0],pts.x[1],pts.x[2],pts.x[3],pts.x[4],pts.x[5], 
         	pts.x[6],pts.x[7],pts.x[8],pts.x[9],pts.x[10] ],
          y: [ pts.y[0],pts.y[1],pts.y[2],pts.y[3],pts.y[4],pts.y[5], 
          	pts.y[6],pts.y[7],pts.y[8],pts.y[9],pts.y[10] ],
    },
      1000,
      Phaser.Easing.Quadratic.InOut,
       true, 0, 0).interpolation(function(v, k) {
          return Phaser.Math.bezierInterpolation(v, k);
     }); 
     // when the path is complete, the enemy 
     //will begin to follow the pixel
     this.tween.onComplete.add(this.isComplete,this);

}

// This displays a visual of the enemy's path
Enemy.prototype.displayPath = function(pts) {
	
	var text;
	var style = { font: "12px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 30, align: "center", backgroundColor: "#000000" };

	for (var i = 0; i < pts.x.length;i++)
		text = game.add.text(pts.x[i],pts.y[i], i, style);

}