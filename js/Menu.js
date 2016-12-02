Menu = function(game) {
}

Menu.prototype = {
 preload:function() {
	game.load.spritesheet('play','./assets/images/play.png',128,64);
	game.load.spritesheet('title','./assets/images/title.png');
},

 create: function() {

 	// creates title
 	var title = this.game.add.sprite(400,100,'title');
 	title.anchor.setTo(0.5,0.5);
	title.scale.setTo(0.5,0.5)

 	// play button
	var playBtn = this.game.add.button(400,300,'play',this.actionOnClick,this);
	playBtn.anchor.setTo(0.5,0.5);

	var style = {font:"20px Arial", fill:"#ff0000", align:"center"};
	var up1_text = this.game.add.text(title.x - 270, 50, "1UP", style);
	up1_text.anchor.set(0.5,0.5);

	
},

update: function() {

},

actionOnClick: function() {
	game.state.start('game',Game);
}

};