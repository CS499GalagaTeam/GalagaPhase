Menu = function() {
}

Menu.prototype = {
 preload:function() {
	game.load.spritesheet('play','./assets/images/play.png',128,64);
	game.load.spritesheet('title','./assets/images/title.png');
},

 create: function() {

 	// creates title
 	var title = this.game.add.sprite(this.game.width/2,200,'title');
 	title.anchor.setTo(0.5,0.5);
	title.scale.setTo(0.6,0.6)

 	// play button
	var playBtn = this.game.add.button(this.game.width/2,300,'play',this.actionOnClick,this);
	playBtn.anchor.setTo(0.5,0.5);
	playBtn.scale.setTo(0.7,0.7);

	var text_style = {font:"20px Arial", fill:"#ff0000", align:"center"};
	var highScore_text = this.game.add.text(this.game.width/2, 50, "HI-SCORE", text_style);
	highScore_text.anchor.set(0.5,0.5);

	var score_style = {font:"20px Arial", fill:"#ffffff", align:"center"};
	var highScore_value = document.getElementById("highscore1").value
	var highScoreValue_text = this.game.add.text(this.game.width/2, 80, highScore_value, score_style)
	highScoreValue_text.anchor.set(0.5,0.5)

	var score_button = this.game.add.text(this.game.width/2, 350, "HighScores", text_style)
	score_button.anchor.set(0.5,0.5)
	score_button.inputEnabled = true;
	score_button.events.onInputDown.add(this.initScoreView, this);


	var our_name = this.game.add.text(this.game.width/2, playBtn.y + 90, "The Planeteers", text_style);
	our_name.anchor.set(0.5,0.5)
	
	
},

update: function() {

},

actionOnClick: function() {
	this.game.state.start('game',Game);
},

initScoreView: function() {
	console.log("starting HighScore!")
	this.game.state.start('highscore',HighScore);
}

};
