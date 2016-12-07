Menu = function() {
	option_number = 0;
}

Menu.prototype = {
 preload:function() {
	game.load.spritesheet('play','./assets/images/play.png',128,64);
	game.load.spritesheet('title','./assets/images/title.png');
	game.load.image('star', './assets/images/star.png');
	
},

 create: function() {
	// define fonts and positions
	var mid_x = this.game.width/2;
	var text_style = {font:"20px Arial", fill:"#ff0000", align:"center"};
	var option_style = {font:"20px Arial", fill:"#71FFB8", align:"center"};
	var score_style = {font:"20px Arial", fill:"#ffffff", align:"center"};
	var cursor_style = {font:"16px Arial", fill:"#ffffff", align:"center"};
 	
 	// creates title
	var title = this.game.add.sprite(mid_x,200,'title');
 	title.anchor.setTo(0.5,0.5);
	title.scale.setTo(0.6,0.6)

	// highscore label text
	var highScore_text = this.game.add.text(mid_x, 50, "HI-SCORE", text_style);
	highScore_text.anchor.set(0.5,0.5);

	// highscore value text
	var highScore_value = document.getElementById("highscore1").value
	var highScoreValue_text = this.game.add.text(mid_x, 80, highScore_value, score_style)
	highScoreValue_text.anchor.set(0.5,0.5)

 	// play button
	playBtn = this.game.add.text(mid_x,300,'Play', option_style);
	playBtn.anchor.setTo(0.5,0.5);
	
	// highscore label button
	score_button = this.game.add.text(mid_x, playBtn.y + 30, "HighScores", option_style)
	score_button.anchor.set(0.5,0.5)

	// credit label button
	credits_button = this.game.add.text(mid_x, score_button.y + 30, "Credits", option_style);
	credits_button.anchor.set(0.5,0.5);

	// current choice triangle label text
	current_choice = this.game.add.text(playBtn.x - 35, playBtn.y, "\u25B6", cursor_style);
	current_choice.anchor.set(0.5,0.5);

	// Our name label text
	var our_name = this.game.add.text(mid_x, score_button.y + 90, "The Planeteers", text_style);
	our_name.anchor.set(0.5,0.5)

	var generic_copyright = this.game.add.text(mid_x, our_name.y + 80, "\u00A9 2016 GENERIC COMPANY LTD.\nALL RIGHTS RESERVED", score_style);
	generic_copyright.anchor.set(0.5,0.5);

	cursor_down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	cursor_down.onDown.add(this.selectNextDown);
	cursor_up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	cursor_up.onDown.add(this.selectNextUp);
	choose_option = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	choose_option.onDown.add(this.chooseOption);
	create_star(game);

},

update: function() {

},

	selectNextDown: function() {
		option_number++;
		switch(this.option_number) {
			case 1:
				this.current_choice.x = score_button.x - 70;
				this.current_choice.y = score_button.y;
				break;
			case 2:
				this.current_choice.x = credits_button.x - 50;
				this.current_choice.y = credits_button.y;
				break;
			default:
				this.current_choice.x = playBtn.x - 35;
				this.current_choice.y = playBtn.y;
				this.option_number = 0;
				break;

		}
	},
	
	selectNextUp: function() {
		option_number--;
		switch(this.option_number) {
			case 0:
				this.current_choice.x = playBtn.x - 35;
				this.current_choice.y = playBtn.y;
				break;
			case 1:
				this.current_choice.x = score_button.x - 70;
				this.current_choice.y = score_button.y;
				break;
			default:
				this.current_choice.x = credits_button.x - 50;
				this.current_choice.y = credits_button.y;
				this.option_number = 2;
				break;

		}
	},

	chooseOption: function() {
		switch(option_number) {
			case 0:
				this.game.state.start('game', Game);
				break;
			case 1:
				option_number = 0
				this.game.state.start('highscore', HighScore);
				break;
			case 2:
				option_number = 0
				this.game.state.start('credit', Credit);
				break;
			default:
				console.log("not an option");
				break;
		}
	},

};