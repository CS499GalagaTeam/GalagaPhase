function create_star(game) {
	var emitter = game.add.emitter(game.world.centerX, 0, 400);
	emitter.width = game.width;
	emitter.makeParticles('star');
	emitter.minParticleScale = 0.01;
	emitter.maxParticleScale = 0.2;
	emitter.setYSpeed(250,500);
	emitter.setXSpeed(-2,2);
	emitter.minRotation = 0;
	emitter.maxRotation = 0;
	emitter.start(false, 1600, 20, 0);
}
