HighScore = function(game) {
}

HighScore.prototype = {

	preload:function() {
	
	},

	create:function() {
		var labels = ["1ST", "2ND", "3RD", "4TH", "5TH"];
		var topPlayer_style = {font:"20px Arial", fill:"#00ffff", align:"center"}
		var player_style = {font:"20px Arial", fill:"#0033ff", align:"center"}
		for (var i = 1; i <= 5; ++i) {
			var tmpScore = document.getElementById("highscore"+i).value
			var tmpName = document.getElementById("highscore" + i + "name").value
			var tmp = null;
			var y_val = (i/6)*this.game.height;
			if (i == 1) {
				tmp = this.game.add.text(this.game.width*0.25,y_val, labels[i - 1], topPlayer_style)
				tmp.anchor.set(0.5,0.5)
				tmp = this.game.add.text(this.game.width*0.5, y_val, tmpScore, topPlayer_style)
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

	},


	update:function() {
	
	},

	actionOnClick:function() {
	
	}

};
