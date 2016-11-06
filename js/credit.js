Credit = function() {
}

Credit.prototype = {

	preload:function() {
	
	},

	create:function() {

		goBack_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		goBack_button.onDown.add(function(){game.state.start("menu",Menu);});
	},

	update:function() {
	
	},

	actionOnClick:function() {
		game.state.start("menu", Menu);
	}
};
