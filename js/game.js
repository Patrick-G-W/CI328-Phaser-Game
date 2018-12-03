console.log('Game loaded');

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

var point;
var bigPoint;
var points;
var bigPoints;

var keys;
var keyInventory = 0;
var inventoryText;

var soundForest;
var soundFootstep;
var soundPoint;
var soundKey;
var soundWin;
var soundDoorLock;
var soundDeath;

var restarting;

var stars;

var Game = {
	preload: function () {
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
        game.load.image('blood', 'assets/blood.png');
        game.load.image('gameOver', 'assets/gameOver.png');
        game.load.image('mediumButton', 'assets/mediumButton.png');
        game.load.audio('soundForest', 'assets/forest.ogg'); //https://freesound.org/people/VKProduktion/sounds/231537/
        game.load.audio('soundFootstep', 'assets/footstep.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270414/
        game.load.audio('soundPoint', 'assets/point.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270408/
        game.load.audio('soundKey', 'assets/key.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270404/
        game.load.audio('soundWin', 'assets/win.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270402/
        game.load.audio('soundDoorLock', 'assets/doorLock.ogg'); //https://freesound.org/people/MrAuralization/sounds/158626/
        game.load.audio('soundDeath', 'assets/death.ogg'); //https://freesound.org/people/DrMinky/sounds/167074/
        game.load.spritesheet('dude', 'assets/spritesheet.png', 23, 34);
        game.load.spritesheet('bird', 'assets/bird.png', 32, 32);
        game.load.spritesheet('doorOpening', 'assets/doorOpening.png', 64, 64);
        game.load.bitmapFont('8bitWonder', 'assets/8bitWonder.png', 'assets/8bitWonder.fnt');
    },

	create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        soundForest = game.add.audio('soundForest');
        soundFootstep = game.add.audio('soundFootstep');
        soundPoint = game.add.audio('soundPoint');
        soundKey = game.add.audio('soundKey');
        soundWin = game.add.audio('soundWin');
        soundDoorLock = game.add.audio('soundDoorLock');
        soundDeath = game.add.audio('soundDeath');

        if (sessionStorage.getItem('music') === 'true') {
            game.time.events.add(Phaser.Timer.SECOND, this.musicDelay, this);
        }

        var background = game.add.sprite(0, 0, 'background');

        background.height = game.height;
        background.width = game.width;

        this.inventoryText = game.add.bitmapText(10, 10, '8bitWonder', 'Inventory ', 20);


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

        this.scoreText = game.add.bitmapText(600, 10, '8bitWonder', 'Score 0', 20);

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
        ledge.body.setSize(370, 30, 0, 5);

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

        cursors = game.input.keyboard.createCursorKeys();



        this.placeSpring(360, 520);

        this.placeSpring(440, 380);

        this.placeSpike(300, 515);

        this.placeSpike(200, 515);

        this.placeSpike(400, 375);

        this.placeLeftSpike(370, 400);

        this.placeLeftSpike(570, 210);

        this.placeRightSpike(250, 250);

		this.generatePoints();
		this.generateBigPoints();
    },

	update: function () {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitSpring = game.physics.arcade.collide(player, springs);
        var hitSpike = game.physics.arcade.collide(player, spikes);
        var hitSpikeLeft = game.physics.arcade.collide(player, spikesLeft);
        var hitSpikeRight = game.physics.arcade.collide(player, spikesRight);
        var hitKey = game.physics.arcade.collide(player, keys);
        var keyHitPlatform = game.physics.arcade.collide(keys, platforms);
        var hitDoor = game.physics.arcade.collide(player, doors);

        game.physics.arcade.collide(points, platforms);
        game.physics.arcade.collide(bigPoints, platforms);

        game.physics.arcade.overlap(player, points, this.collectPoint, null, this);
        game.physics.arcade.overlap(player, bigPoints, this.collectBigPoint, null, this);

        player.body.velocity.x = 0;


        if (cursors.left.isDown && player.body.touching.down) {
            player.body.velocity.x = -150;
            player.animations.play('left');
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundFootstep.play('', 0, 1, true, false);
            }
        }
        else if (cursors.right.isDown && player.body.touching.down) {
            player.body.velocity.x = 150;
            player.animations.play('right');
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundFootstep.play('', 0, 1, true, false);
            }
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
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundFootstep.stop();
            }
        }

        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -150;
        }

        if (hitSpring) {
            player.body.velocity.y = -350;
        }

        if (hitSpike || hitSpikeLeft || hitSpikeRight) {
            this.death();
        }

        if (hitKey) {
            game.add.text(game.world.centerX, game.world.centerY, 'You collected a key!').lifespan = 1000;
            keys.destroy();
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundKey.play();
            }
            game.add.sprite(190, 10, 'key');
            keyInventory = 1;
        }

        if (hitDoor && keyInventory === 1) {
            game.add.text(game.world.centerX, game.world.centerY, 'Level complete');
            door.animations.play('door');
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundWin.play('', 0, 1, true, false);
            }
        }
        else if (hitDoor && keyInventory === 0) {
            game.add.text(game.world.centerX, game.world.centerY, 'You need to collect the key first').lifespan = 1000;
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundDoorLock.play();
            }
        }
    },

	generatePoints: function () {
		points = game.add.group();
		points.enableBody = true;

		var point = points.create(140, 500, 'point');
		point = points.create(210, 490, 'point');
		point = points.create(310, 490, 'point');
		point = points.create(330, 370, 'point');
		point = points.create(370, 300, 'point');
		point = points.create(450, 340, 'point');
		point = points.create(550, 360, 'point');
		point = points.create(620, 360, 'point');
		point = points.create(690, 360, 'point');
		point = points.create(650, 170, 'point');
		point = points.create(150, 210, 'point');
		point = points.create(100, 210, 'point');
	},

	generateBigPoints: function () {
		bigPoints = game.add.group();
		bigPoints.enableBody = true;

		var bigPoint = bigPoints.create(700, 160, 'bigPoint');
	},

	collectPoint: function (player, point) {
	    if (sessionStorage.getItem('soundEffect') === 'true') {
            soundPoint.play();
        }
		point.kill();
		score += 10;
		this.scoreText.text = 'Score: ' + score;
	},

	musicDelay: function () {
		soundForest.play('', 0, 0.5, true, false);
    },

	collectBigPoint: function (player, bigPoint) {
	    if (sessionStorage.getItem('soundEffect') === 'true') {
            soundPoint.play();
        }
        bigPoint.kill();
        score += 50;
        this.scoreText.text = 'Score: ' + score;
    },

	placePoint: function (x, y) {
        point = points.create(x, y, 'point');
        point.body.immovable = true;
    },

	death: function () {
        game.add.image(game.world.centerX - 200, game.world.centerY - 134, 'gameOver').alpha = 0.6;

        game.add.bitmapText(game.world.centerX - 180, game.world.centerY - 70, '8bitWonder', 'GAME OVER', 40);

        game.add.button(game.world.centerX - 150, game.world.centerY + 20, 'mediumButton', this.restart, this);
        game.add.bitmapText(game.world.centerX - 135, game.world.centerY + 50, '8bitWonder', 'Restart', 15);
        game.add.button(game.world.centerX + 20, game.world.centerY + 20, 'mediumButton', this.backToMenu, this);
        game.add.bitmapText(game.world.centerX + 35, game.world.centerY + 40, '8bitWonder', 'Quit', 30);
        game.add.bitmapText(game.world.centerX + 35, game.world.centerY + 40, '8bitWonder', 'Quit', 30);
        game.add.bitmapText(game.world.centerX - 75, game.world.centerY - 20, '8bitWonder', this.scoreText.text, 20);
        this.scoreText.kill();

        if (sessionStorage.getItem('soundEffect') === 'true') {
            soundDeath.play();
        }
        var emitter = game.add.emitter(0, 0, 1000);
        emitter.makeParticles('blood');
        emitter.gravity = 200;
        emitter.x = player.x;
        emitter.y = player.y;
        emitter.start(true, 2000, null, 300);
        player.kill();
        if (sessionStorage.getItem('soundEffect') === 'true') {
            soundFootstep.stop();
        }
    },

	placeSpike: function (x, y) {
        var name = spikes.create(x, y, 'spikes');
        name.body.setSize(10, 30, 10);
        name.body.immovable = true;
    },

	placeLeftSpike: function (x, y) {
        var name = spikesLeft.create(x, y, 'spikesLeft');
        name.body.setSize(30, 10, 0, 10);
        name.body.immovable = true;
    },

	placeRightSpike: function (x, y) {
        var name = spikesRight.create(x, y, 'spikesRight');
        name.body.setSize(30, 10, 0, 10);
        name.body.immovable = true;
    },

	placeSpring: function (x, y) {
        var name = springs.create(x, y, 'springs');
        name.body.immovable = true;
    },

	restart: function () {
        keyInventory = 0;
        score = 0;
        this.game.state.restart();
    },

    backToMenu: function () {
	    if (sessionStorage.getItem('soundEffect') === 'true') {
	        soundForest.stop();
        }
	    this.state.start('Menu');
    },

	render: function () {
        //game.debug.body(player);
        //game.debug.physicsGroup(spikes);
        //game.debug.physicsGroup(springs);
        //game.debug.physicsGroup(spikesLeft);
        //game.debug.physicsGroup(spikesRight);
        //game.debug.physicsGroup(keys);
        //game.debug.physicsGroup(springs);
        //game.debug.physicsGroup(platforms);
    }
};