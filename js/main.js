var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
	game.load.image('background', './assets/images/background.jpg');
	game.load.image('galaga', './assets/galaga.png');
	game.load.image('bullet', './assets/images/bullet.png');
	game.load.image('enemy1', './assets/images/enemy1.png');
	game.load.image('enemy2', './assets/images/enemy2.png');
	game.load.image('explosion', './assets/images/explosion.png');
}

function create() {

	game.add.sprite(0,0, 'background');
	game.physics.startSystem(Phaser.Physics.ARCADE);

	var player = game.add.sprite(0.45*600,600-50,'galaga');
	game.physics.arcade.enable(player);
}

function update() {

}
