var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('movingPlatform', 'assets/movingPlatform.png');
	game.load.image('springs', 'assets/jump.png'); //http://pixelartmaker.com/art/4dae9891e38493b
	game.load.image('spikes', 'assets/spike.png');
	game.load.image('spikesRight', 'assets/spikeRightSide.png');
	game.load.image('spikesLeft', 'assets/spikeLeftSide.png');
	game.load.image('key', 'assets/key.png');
	game.load.image('door', 'assets/door.png');
	game.load.image('point', 'assets/point.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('ghost', 'assets/spider01.png', 32, 48);
}

var player;
var platforms;
var movingPlatforms;
var movingPlatform;
var cursors;

var score = 0;
var scoreText = 'Score: 0';
var key;

var clouds;

var enemies;
var enemyspeed = 10;

var springs;
var spikes;
var spikesRight;
var spikesLeft;

var doors;

var points;

var keys;
var keyInventory = 0;

var gameover;
var restarting;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'sky');

    game.add.text(10, 10, 'Inventory: ');

    //scoreText = game.add.text(650, 10, 'Score: ' + score);

	platforms = game.add.group();

	platforms.enableBody = true;

	movingPlatforms = game.add.group();

	movingPlatforms.enableBody = true;

	springs = game.add.group();

	springs.enableBody = true;

	spikes = game.add.group();

	spikes.enableBody = true;

	spikesRight = game.add.group();

	spikesRight.enableBody = true;

	spikesLeft = game.add.group();

	spikesLeft.enableBody = true;

	spikesRight = game.add.group();

	spikesRight.enableBody = true;

	keys = game.add.group();

	keys.enableBody = true;

	var key = keys.create(10, 400, 'key');

	key.body.gravity.y = 100;

	key.body.bounce.y = 1;

	doors = game.add.group();

	doors.enableBody = true;

	var door = doors.create(500, 500, 'door');

	door.body.immovable = true;

    points = game.add.group();

    points.enableBody = true;

    for (var i = 0; i < 12; i++) {
        var point = points.create(i * 70, 0, 'point');

        point.body.gravity.y = 300;

        point.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(650, 10, 'score: 0');

	var ground = platforms.create(0, game.world.height - 64, 'ground');

	ground.scale.setTo(2, 2);

	ground.body.immovable = true;

	//movingPlatform = movingPlatforms.create(100, 100, 'movingPlatform');

	movingPlatform = game.add.sprite(100, 100, 'movingPlatform');

	game.physics.arcade.enable(movingPlatform);

	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;

	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;

	player = game.add.sprite(32, game.world.height - 150, 'dude');

	game.physics.arcade.enable(player);

	player.body.gravity.y = 350;
	player.body.collideWorldBounds = true;
	player.body.setSize(15, 48, 7,);

	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.animations.add('death', [3, 5, 6], 10, true);

	cursors = game.input.keyboard.createCursorKeys();

	placeSpring(360, 520, 'spring1');

	placeSpring(440, 380, 'spring2');

	placeSpike(300, 510, 'spike1');

	placeSpike(200, 510, 'spike2');

	placeSpike(400, 370, 'spike3');

	placeLeftSpike(370, 400, 'leftSpike1');

	placeRightSpike(250, 250, 'rightSpike1');

}


function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hitmovingPlatform = game.physics.arcade.collide(player, movingPlatform);
    var hitSpring = game.physics.arcade.collide(player, springs);
    var hitSpike = game.physics.arcade.collide(player, spikes);
    var hitSpikeLeft = game.physics.arcade.collide(player, spikesLeft);
    var hitSpikeRight = game.physics.arcade.collide(player, spikesRight);
    var hitKey = game.physics.arcade.collide(player, keys);
    var keyHitPlatform = game.physics.arcade.collide(keys, platforms);
    var hitDoor = game.physics.arcade.collide(player, doors);
    game.physics.arcade.collide(points, platforms);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;

        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;

        player.animations.play('right');
    } else {
        player.animations.stop();

        player.frame = 4;

    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -150;
    }

    if (hitSpring) {
        player.body.velocity.y = -350;
    }

    if (hitSpike || hitSpikeLeft || hitSpikeRight) {
        spike();
        player.animations.play('death');
        player.body.moves = false;
    }

    if (hitKey) {
        game.add.text(game.world.centerX, game.world.centerY, 'You collected a key!').lifespan = 1000;
        keys.destroy();
        game.add.sprite(150, 20, 'key');
        keyInventory = 1;
    }

    if (hitDoor && keyInventory === 1) {
        game.add.text(game.world.centerX, game.world.centerY, 'Level complete');
    } else if (hitDoor && keyInventory === 0) {
        game.add.text(game.world.centerX, game.world.centerY, 'You need to collect the key first').lifespan = 1000;
    }

    //if (hitPoint) {
    //    collectPoint();
    //}

    game.physics.arcade.overlap(player, points, collectPoint, null, this);
}


function collectPoint (player, point) {

    // Removes the star from the screen
    point.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function spike() {
	gameover = game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER');
	game.time.events.add(Phaser.Timer.SECOND * 4, restart, this);
	restarting = game.add.text(game.world.centerX - 50, game.world.centerY - 50, 'Restarting in: ' + game.time.events.duration / 1000);
}

function placeSpike(x, y, name) {
	var name = spikes.create(x, y, 'spikes');
	name.body.setSize(10, 30, 10);
	name.body.immovable = true;
}

function placeLeftSpike(x, y, name) {
	var name = spikesLeft.create(x, y, 'spikesLeft');
	name.body.setSize(30, 10, 0, 10);
	name.body.immovable = true;
}

function placeRightSpike(x, y, name) {
	var name = spikesRight.create(x, y, 'spikesRight');
	name.body.setSize(30, 10, 0, 10);
	name.body.immovable = true;
}

function placeSpring(x, y, name) {
	var name = springs.create(x, y, 'springs');
	name.body.immovable = true;
}

function restart() {
	keyInventory = 0;
	score = 0;
	this.game.state.restart();
}

function render() {
	game.debug.body(player);
	game.debug.physicsGroup(spikes);
	game.debug.physicsGroup(springs);
	game.debug.physicsGroup(spikesLeft);
	game.debug.physicsGroup(spikesRight);
	game.debug.physicsGroup(keys);
	game.debug.physicsGroup(springs);
	game.debug.text(scoreText, 10, 10);
}