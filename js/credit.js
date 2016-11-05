Credit = function() {
}

Credit.prototype = {

	preload:function() {
	
	},

	create:function() {
	},

	update:function() {
	
	},

	actionOnClick:function() {
		game.state.start("menu", Menu);
	}
};
