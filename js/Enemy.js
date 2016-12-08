var Enemy = function(game, x, y, xPix, yPix, enemyNum) {
  Phaser.Sprite.call(this, game, x, y, '');

  // these two variables are undefined
  //alert(xPix + " " + yPix);
  this.xPix = xPix;
  this.yPix = yPix;
  this.enemyNum = enemyNum;

  this.create();

}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;


Enemy.prototype.preload = function() {}

Enemy.prototype.create = function() {

  var enemySprites = ['enemy1', 'enemy2', 'enemy3'];
  // enemy sprite and its animation
  this.enemy = game.add.sprite(this.x, this.y, enemySprites[this.enemyNum]);
  this.enemy.anchor.set = 0.5;
  this.enemy.animations.add(enemySprites[this.enemyNum], null, 10, true);
  this.enemy.animations.play(enemySprites[this.enemyNum]);

  //This will be tracked by the enemy sprite
  //will be set to invisible
  this.pixel = game.add.sprite(this.xPix, this.yPix, 'pixel');
  this.pixel.visible = false;

  game.physics.arcade.enable(this.enemy);
  game.physics.arcade.enable(this.pixel);



  this.sideTween();


/* 
This runs as soon as the enemy is created
once completed, the enemies will begin to follow the 
pixels on the screen
  */
// currently disabled
//this.group1Path();	
}



// complete will be set to true once group1Path is complete
//var completed = false;
Enemy.prototype.update = function() {

  if (!this.exists) return;

  // when group1Path is completed, var compelete = true
  // then enemy will follow the pixel 
  //if (completed)
  game.physics.arcade.moveToObject(this.enemy, this.pixel, 100);
}



/*

 the path of pixel
moves back and forth
represents the movement of enemy sprites
while enemies are flying in

*/

Enemy.prototype.sideTween = function() {

  // move pixel from xPix to (xPix + 200)
  this.tween = game.add.tween(this.pixel).to({
    x: this.xPix + 200
  }, 2000, null, -1, true);
  //moves pixel back and forth 
  this.tween.yoyo(true, 0, 0);
  //repeats the tween. -1 repeats the tween infinite times
  this.tween.repeat(-1);
  this.tween.start();

}

/*
	once the group1Path tween is complete, this function
	sets completed to true to begin the follow sequence
*/
Enemy.prototype.isComplete = function() {

  completed = true;
}


Enemy.prototype.expandTween = function() {}

//path of the first group
Enemy.prototype.group1Path = function() {

  // reference point for x coordinate
  var p = game.width / 1.33;
  // for y coordinate
  var q = game.width / 4
  var pts;

  //the points for  the path that the first group takes
  if (this.x > game.width / 2) {

    pts = {
      'x': [p, p, p, p - 50, p - 130, p - 110, p + 110, p + 110, p - 30, p - 90, p - 200],
      'y': [100, 200, 300, 300, 230, 10, 10, 180, 450, 500, 300],

    }
  //this.displayPath(pts);
  } else {
    pts = {
      'x': [q, q, q, q + 50, q + 130, q + 110, q - 110, q - 110, q + 30, q + 90, q + 180],
      'y': [100, 200, 300, 300, 230, 10, 10, 180, 450, 500, 300],
    }

  //this.displayPath(pts);
  }
  // path of the first group using the bezier path
  this.tween = game.add.tween(this.enemy).to(
    {
      x: [pts.x[0], pts.x[1], pts.x[2], pts.x[3], pts.x[4], pts.x[5],
        pts.x[6], pts.x[7], pts.x[8], pts.x[9], pts.x[10]],
      y: [pts.y[0], pts.y[1], pts.y[2], pts.y[3], pts.y[4], pts.y[5],
        pts.y[6], pts.y[7], pts.y[8], pts.y[9], pts.y[10]],
    },
    2000,
    Phaser.Easing.Quadratic.InOut,
    true, 0, 0).interpolation(function(v, k) {
    return Phaser.Math.bezierInterpolation(v, k);
  });
  // when the path is complete, the enemy 
  //will begin to follow the pixel
  this.tween.onComplete.add(this.isComplete, this);

}

// This displays a visual of the enemy's path
// using numbers as points
Enemy.prototype.displayPath = function(pts) {

  var text;
  var style = {
    font: "12px Arial",
    fill: "#ffffff",
    wordWrap: true,
    wordWrapWidth: 30,
    align: "center",
    backgroundColor: "#000000"
  };

  for (var i = 0; i < pts.x.length; i++)
    text = game.add.text(pts.x[i], pts.y[i], i, style);

}
