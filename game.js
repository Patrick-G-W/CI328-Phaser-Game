var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('background', 'assets/background.png'); //https://jesse-m.itch.io/jungle-pack
	game.load.image('ground', 'assets/ground.png');
	game.load.image('newGround', 'assets/newGround.png');
	game.load.image('platform', 'assets/platform.png');
	game.load.image('springs', 'assets/jump.png'); //http://pixelartmaker.com/art/4dae9891e38493b
	game.load.image('spikes', 'assets/spike.png');
	game.load.image('spikesRight', 'assets/spikeRightSide.png');
	game.load.image('spikesLeft', 'assets/spikeLeftSide.png');
	game.load.image('key', 'assets/key.png');
	game.load.image('door', 'assets/door.png'); //https://opengameart.org/content/wooden-fortress-and-animated-doors
	game.load.image('point', 'assets/point.png');
	game.load.image('bigPoint', 'assets/bigPoint.png');
	game.load.image('behindDoor', 'assets/behindDoor.png');
	game.load.audio('soundForest', 'assets/forest.ogg'); //https://freesound.org/people/VKProduktion/sounds/231537/
	game.load.audio('soundFootstep', 'assets/footstep.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270414/
	game.load.audio('soundPoint', 'assets/point.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270408/
	game.load.audio('soundKey', 'assets/key.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270404/
	game.load.audio('soundWin', 'assets/win.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270402/
	game.load.audio('soundDoorLock', 'assets/doorLock.ogg'); //https://freesound.org/people/MrAuralization/sounds/158626/
	game.load.spritesheet('dude', 'assets/spritesheet.png', 23, 34);
	game.load.spritesheet('bird', 'assets/bird.png', 32, 32);
	game.load.spritesheet('doorOpening', 'assets/doorOpening.png', 64, 64);
}

var player;
var platforms;
var cursors;

var bird;

var score = 0;
var scoreText = 'Score: 0';

var springs;
var spikes;
var spikesRight;
var spikesLeft;

var doors;
var door;
var behindDoors;

var points;
var bigPoints;

var keys;
var keyInventory = 0;

var soundForest;
var soundFootstep;
var soundPoint;
var soundKey;
var soundWin;
var soundDoorLock;

var gameover;
var restarting;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	soundForest = game.add.audio('soundForest');
	soundFootstep = game.add.audio('soundFootstep');
	soundPoint = game.add.audio('soundPoint');
	soundKey = game.add.audio('soundKey');
	soundWin = game.add.audio('soundWin');
	soundDoorLock = game.add.audio('soundDoorLock');

	soundForest.play('', 0, 0.5, true, false);

	//game.add.sprite(0, 0, 'sky');

	var background = game.add.sprite(0, 0, 'background');

	background.height = game.height;
	background.width = game.width;

    game.add.text(10, 10, 'Inventory: ');

    behindDoors = game.add.group();
    var behindDoor = behindDoors.create(720, 465, 'behindDoor');

    behindDoor.scale.setTo(1, 1);

	platforms = game.add.group();

	platforms.enableBody = true;

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

	var key = keys.create(10, 150, 'key');

	key.body.gravity.y = 100;

	key.body.bounce.y = 1;

	doors = game.add.group();

	doors.enableBody = true;

	door = doors.create(730, 475, 'doorOpening');

	door.animations.add('door', [1, 2, 3, 4], 3, false);

	door.body.immovable = true;

	door.frame = 1;



    points = game.add.group();

    points.enableBody = true;

    bigPoints = game.add.group();

    bigPoints.enableBody = true;

    var name = bigPoints.create(700, 160, 'bigPoint');
    name.body.immovable = true;

    scoreText = game.add.text(650, 10, 'Score: 0');

	var ground = platforms.create(0, game.world.height - 64, 'newGround');

	ground.body.immovable = true;
	ground.body.setSize(800, 100, 0, 5);

	var ledge = platforms.create(400, 400, 'platform');
	ledge.body.immovable = true;

	ledge.width = 400;
	ledge.body.setSize(400, 30, 0, 5);

	ledge = platforms.create(-150, 250, 'platform');
	ledge.body.immovable = true;

	ledge.width = 400;
    ledge.body.setSize(400, 30, 0, 5);

	ledge = platforms.create(600, 210, 'platform');
	ledge.body.immovable = true;

	ledge.width = 300;
    ledge.body.setSize(400, 30, 0, 5);

    bird = game.add.sprite(-50, 30, 'bird');

    game.physics.arcade.enable(bird);

    bird.animations.add('right', [0, 1, 2, 3], 10, true);

    bird.animations.play('right');

    game.add.tween(bird).to({x: 850}, 10000, Phaser.Easing.Quadratic.InOut, true, 5000, 1000, false);

	player = game.add.sprite(32, game.world.height - 150, 'dude');

	game.physics.arcade.enable(player);

	player.body.gravity.y = 350;
	player.body.collideWorldBounds = true;
	player.body.setSize(15, 35, 3);

	player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
	player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	player.animations.add('death', [3, 5, 6], 10, true);

	cursors = game.input.keyboard.createCursorKeys();

	placeSpring(360, 520);

	placeSpring(440, 380);

	placeSpike(300, 515);

	placeSpike(200, 515);

	placeSpike(400, 375);

	placeLeftSpike(370, 400);

	placeLeftSpike(570, 210);

	placeRightSpike(250, 250);

	placePoints();
}


function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hitSpring = game.physics.arcade.collide(player, springs);
    var hitSpike = game.physics.arcade.collide(player, spikes);
    var hitSpikeLeft = game.physics.arcade.collide(player, spikesLeft);
    var hitSpikeRight = game.physics.arcade.collide(player, spikesRight);
    var hitKey = game.physics.arcade.collide(player, keys);
    var keyHitPlatform = game.physics.arcade.collide(keys, platforms);
    var hitDoor = game.physics.arcade.collide(player, doors);
    game.physics.arcade.collide(points, platforms);
    game.physics.arcade.collide(points, doors);
    game.physics.arcade.collide(points, keys);
    game.physics.arcade.collide(points, springs);
    game.physics.arcade.collide(points, spikes);
    game.physics.arcade.collide(points, spikesLeft);
    game.physics.arcade.collide(points, spikesRight);

    player.body.velocity.x = 0;


    if (cursors.left.isDown && player.body.touching.down) {
        player.body.velocity.x = -150;
        player.animations.play('left');
        soundFootstep.play('', 0, 1, true, false);
	}
    else if (cursors.right.isDown && player.body.touching.down) {
        player.body.velocity.x = 150;
        player.animations.play('right');
        soundFootstep.play('', 0, 1, true, false);
	}
    else if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 5;
        soundFootstep.stop();
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
        soundKey.play();
        game.add.sprite(150, 20, 'key');
        keyInventory = 1;
    }

    if (hitDoor && keyInventory === 1) {
        game.add.text(game.world.centerX, game.world.centerY, 'Level complete');
        door.animations.play('door');
        soundWin.play('', 0, 1, true, false);
    }
    else if (hitDoor && keyInventory === 0) {
        game.add.text(game.world.centerX, game.world.centerY, 'You need to collect the key first').lifespan = 1000;
        soundDoorLock.play();
    }

    game.physics.arcade.overlap(player, points, collectPoint, null, this);
    game.physics.arcade.overlap(player, bigPoints, collectBigPoint, null, this);
}

function placePoints() {
    placePoint(140, 500);
    placePoint(210, 490);
    placePoint(310, 490);
	placePoint(330, 370);
	placePoint(370, 300);
	placePoint(450, 340);
	placePoint(550, 360);
	placePoint(620, 360);
	placePoint(690, 360);
	placePoint(650, 170);
	placePoint(150, 210);
	placePoint(100, 210);

}

function collectPoint (player, point) {
    point.kill();
	soundPoint.play();
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function collectBigPoint (player, bigPoint) {
	bigPoint.kill();
	soundPoint.play();
	score += 50;
	scoreText.text = 'Score: ' + score;
}

function placePoint(x, y) {
	var name = points.create(x, y, 'point');
	name.body.immovable = true;
}

function spike() {
	gameover = game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER');
	game.time.events.add(Phaser.Timer.SECOND * 4, restart, this);
	restarting = game.add.text(game.world.centerX - 50, game.world.centerY - 50, 'Restarting in: ' + game.time.events.duration / 1000);
}

function placeSpike(x, y) {
	var name = spikes.create(x, y, 'spikes');
	name.body.setSize(10, 30, 10);
	name.body.immovable = true;
}

function placeLeftSpike(x, y) {
	var name = spikesLeft.create(x, y, 'spikesLeft');
	name.body.setSize(30, 10, 0, 10);
	name.body.immovable = true;
}

function placeRightSpike(x, y) {
	var name = spikesRight.create(x, y, 'spikesRight');
	name.body.setSize(30, 10, 0, 10);
	name.body.immovable = true;
}

function placeSpring(x, y) {
	var name = springs.create(x, y, 'springs');
	name.body.immovable = true;
}

function restart() {
	keyInventory = 0;
	score = 0;
	this.game.state.restart();
}

function render() {
	//game.debug.body(player);
	//game.debug.physicsGroup(spikes);
	//game.debug.physicsGroup(springs);
	//game.debug.physicsGroup(spikesLeft);
	//game.debug.physicsGroup(spikesRight);
	//game.debug.physicsGroup(keys);
	//game.debug.physicsGroup(springs);
	//game.debug.physicsGroup(platforms);
}