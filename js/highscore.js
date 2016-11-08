HighScore = function(game) {
}

HighScore.prototype = {

	preload:function() {
	
	},

	create:function() {
		var labels = ["1ST", "2ND", "3RD", "4TH", "5TH"];
		var topPlayer_style = {font:"20px Arial", fill:"#ffff00", align:"center"}
		var player_style = {font:"20px Arial", fill:"#71ffB8", align:"center"}
		var goBack_style = {font:"16px Arial", fill:"#ff0000", align:"center"}
		var highscore_style = {font:"20px Arial", fill:"#ff0000", align:"center"}
		var tmp = null;
		for (var i = 1; i <= 5; ++i) {
			var tmpScore = document.getElementById("highscore"+i).value
			var tmpName = document.getElementById("highscore" + i + "name").value
			tmp = null;
			var y_val = ((i/10)*this.game.height) + 0.3*this.game.height;
			if (i == 1) {
				tmp = this.game.add.text(this.game.width*0.25,y_val, labels[i - 1], topPlayer_style)
				tmp.anchor.set(0.5,0.5)
				tmp = this.game.add.text(this.game.width*0.5, y_val - 50, "SCORE", player_style)
				tmp.anchor.set(0.5,0.5)
				tmp = this.game.add.text(this.game.width*0.5, y_val, tmpScore, topPlayer_style)
				tmp.anchor.set(0.5,0.5)
				tmp = this.game.add.text(this.game.width*0.75, y_val - 50, "NAME", player_style)
				tmp.anchor.set(0.5,0.5)
				tmp = this.game.add.text(this.game.width*0.75, y_val, tmpName, topPlayer_style)
				tmp.anchor.set(0.5,0.5)
			} else {
				tmp = this.game.add.text(this.game.width*0.25,y_val, labels[i - 1], player_style)
				tmp.anchor.set(0.5,0.5)
				tmp = this.game.add.text(this.game.width*0.5, y_val, tmpScore, player_style)
				tmp.anchor.set(0.5,0.5)
				tmp = this.game.add.text(this.game.width*0.75, y_val, tmpName, player_style)
				tmp.anchor.set(0.5,0.5)
			}
		}

		var highscore_text = this.game.add.text(this.game.width/2, 0.15*this.game.height, "TOP 5 PLAYERS SCORES", highscore_style);
		highscore_text.anchor.set(0.5,0.5);
		var goBack_text = this.game.add.text(this.game.width/2, this.game.height - 20, "press spacebar to go back to main menu", goBack_style);
		goBack_text.anchor.set(0.5,0.5)

		go_back = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		go_back.onDown.add(function(){game.state.start("menu",Menu);});
		create_star(game);
	},


	update:function() {
	
	},

};
