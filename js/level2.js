console.log('Level 2 loaded');

var player;
var platforms;
var cursors;

var bird;

var score = 0;

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
var soundDeath;

var level2 = { // incorrect error, is used by other js files through states. without game, other js cannot tell what this file is
    preload: function () {
        this.game.load.image('background', 'assets/background.png'); //https://jesse-m.itch.io/jungle-pack
        this.game.load.image('newGround', 'assets/newGround.png');
        this.game.load.image('platform', 'assets/platform.png');
        this.game.load.image('springs', 'assets/jump.png'); //http://pixelartmaker.com/art/4dae9891e38493b
        this.game.load.image('spikes', 'assets/spike.png');
        this.game.load.image('spikesRight', 'assets/spikeRightSide.png');
        this.game.load.image('spikesLeft', 'assets/spikeLeftSide.png');
        this.game.load.image('key', 'assets/key.png');
        this.game.load.image('door', 'assets/door.png'); //https://opengameart.org/content/wooden-fortress-and-animated-doors
        this.game.load.image('point', 'assets/point.png');
        this.game.load.image('bigPoint', 'assets/bigPoint.png');
        this.game.load.image('behindDoor', 'assets/behindDoor.png');
        this.game.load.image('blood', 'assets/blood.png');
        this.game.load.image('gameOver', 'assets/gameOver.png');
        this.game.load.image('mediumButton', 'assets/mediumButton.png');
        this.game.load.audio('soundForest', 'assets/forest.ogg'); //https://freesound.org/people/VKProduktion/sounds/231537/
        this.game.load.audio('soundFootstep', 'assets/footstep.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270414/
        this.game.load.audio('soundPoint', 'assets/point.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270408/
        this.game.load.audio('soundKey', 'assets/key.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270404/
        this.game.load.audio('soundWin', 'assets/win.ogg'); //https://freesound.org/people/LittleRobotSoundFactory/sounds/270402/
        this.game.load.audio('soundDoorLock', 'assets/doorLock.ogg'); //https://freesound.org/people/MrAuralization/sounds/158626/
        this.game.load.audio('soundDeath', 'assets/death.ogg'); //https://freesound.org/people/DrMinky/sounds/167074/
        this.game.load.spritesheet('dude', 'assets/spritesheet.png', 23, 34);
        this.game.load.spritesheet('bird', 'assets/bird.png', 32, 32);
        this.game.load.spritesheet('doorOpening', 'assets/doorOpening.png', 64, 64);
        this.game.load.bitmapFont('8bitWonder', 'assets/8bitWonder.png', 'assets/8bitWonder.fnt');
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        soundForest = this.game.add.audio('soundForest');
        soundFootstep = this.game.add.audio('soundFootstep');
        soundPoint = this.game.add.audio('soundPoint');
        soundKey = this.game.add.audio('soundKey');
        soundWin = this.game.add.audio('soundWin');
        soundDoorLock = this.game.add.audio('soundDoorLock');
        soundDeath = this.game.add.audio('soundDeath');

        if (sessionStorage.getItem('music') === 'true') {
            this.game.time.events.add(Phaser.Timer.SECOND, this.musicDelay, this);
        }

        var background = this.game.add.sprite(0, 0, 'background');

        background.height = this.game.height;
        background.width = this.game.width;

        this.game.add.bitmapText(10, 10, '8bitWonder', 'Inventory ', 20);


        behindDoors = this.game.add.group();
        var behindDoor = behindDoors.create(0, 465, 'behindDoor');

        behindDoor.scale.setTo(1, 1);

        platforms = this.game.add.group();

        platforms.enableBody = true;

        springs = this.game.add.group();

        springs.enableBody = true;

        spikes = this.game.add.group();

        spikes.enableBody = true;

        spikesRight = this.game.add.group();

        spikesRight.enableBody = true;

        spikesLeft = this.game.add.group();

        spikesLeft.enableBody = true;

        spikesRight = this.game.add.group();

        spikesRight.enableBody = true;

        keys = this.game.add.group();

        keys.enableBody = true;

        var key = keys.create(330, 150, 'key');

        key.body.gravity.y = 100;

        key.body.bounce.y = 1;

        doors = this.game.add.group();

        doors.enableBody = true;

        door = doors.create(8, 475, 'doorOpening');

        door.animations.add('door', [1, 2, 3, 4], 3, false);

        door.body.immovable = true;

        door.frame = 1;

        this.scoreText = this.game.add.bitmapText(600, 10, '8bitWonder', 'Score 0', 20);

        var ground = platforms.create(0, this.game.world.height - 64, 'newGround');

        ground.body.immovable = true;
        ground.body.setSize(800, 100, 0, 5);

        var ledge = platforms.create(- 10, 400, 'platform');
        ledge.body.immovable = true;

        ledge.width = 400;
        ledge.body.setSize(375, 30, 0, 5);

        ledge = platforms.create(300, 300, 'platform');
        ledge.body.immovable = true;

        ledge.width = 600;
        ledge.body.setSize(450, 30, 0, 5);

        ledge = platforms.create(0, 210, 'platform');
        ledge.body.immovable = true;

        ledge.width = 300;
        ledge.body.setSize(375, 30, 0, 5);

        ledge = platforms.create(0, 120, 'platform');
        ledge.body.immovable = true;

        ledge.width = 200;

        bird = this.game.add.sprite(-50, 30, 'bird');

        this.game.physics.arcade.enable(bird);

        bird.animations.add('right', [0, 1, 2, 3], 10, true);

        bird.animations.play('right');

        this.game.add.tween(bird).to({x: 850}, 10000, Phaser.Easing.Quadratic.InOut, true, 5000, 1000, false);

        player = this.game.add.sprite(10, 10, 'dude');

        this.game.physics.arcade.enable(player);

        player.body.gravity.y = 350;
        player.body.collideWorldBounds = true;
        player.body.setSize(15, 35, 3);

        player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
        player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

        cursors = this.game.input.keyboard.createCursorKeys();


        this.placeSpring(390, 285);

        this.placeSpike(270, 190);
        this.placeSpike(330, 277);
        this.placeSpike(500, 277);
        this.placeSpike(250, 377);
        this.placeSpike(150, 377);
        this.placeSpike(150, 515);
        this.placeSpike(250, 515);
        this.placeSpike(350, 515);
        this.placeSpike(550, 515);
        this.placeSpike(650, 515);

        this.placeRightSpike(200,120);

        this.placeRightSpike(390, 400);

        this.generatePoints();
        this.generateBigPoints();
    },

    update: function () {
        var hitPlatform = this.game.physics.arcade.collide(player, platforms);
        var hitSpring = this.game.physics.arcade.collide(player, springs);
        var hitSpike = this.game.physics.arcade.collide(player, spikes);
        var hitSpikeLeft = this.game.physics.arcade.collide(player, spikesLeft);
        var hitSpikeRight = this.game.physics.arcade.collide(player, spikesRight);
        var hitKey = this.game.physics.arcade.collide(player, keys);
        this.game.physics.arcade.collide(keys, platforms);
        var hitDoor = this.game.physics.arcade.collide(player, doors);

        this.game.physics.arcade.collide(points, platforms);
        this.game.physics.arcade.collide(bigPoints, platforms);

        this.game.physics.arcade.overlap(player, points, this.collectPoint, null, this);
        this.game.physics.arcade.overlap(player, bigPoints, this.collectBigPoint, null, this);

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
            keys.destroy();
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundKey.play();
            }
            this.game.add.sprite(190, 10, 'key');
            keyInventory = 1;
        }

        if (hitDoor && keyInventory === 1) {
            this.levelComplete();
        }
        else if (hitDoor && keyInventory === 0) {
            if (sessionStorage.getItem('soundEffect') === 'true') {
                soundDoorLock.play();
            }
        }
    },

    render: function () {
        //this.game.debug.body(player);
        //this.game.debug.physicsGroup(spikes);
        //this.game.debug.physicsGroup(springs);
        //this.game.debug.physicsGroup(spikesLeft);
        //this.game.debug.physicsGroup(spikesRight);
        //this.game.debug.physicsGroup(keys);
        //this.game.debug.physicsGroup(springs);
        //this.game.debug.physicsGroup(platforms);
    },

    generatePoints: function () {
        points = this.game.add.group();
        points.enableBody = true;

        var point = points.create(100, 175, 'point');
        point = points.create(600, 265, 'point');
        point = points.create(675, 265, 'point');
        point = points.create(100, 360, 'point');
        point = points.create(40, 360, 'point');
        point = points.create(450, 500, 'point');
        point = points.create(600, 500, 'point');
        point = points.create(700, 500, 'point');
    },

    generateBigPoints: function () {
        bigPoints = this.game.add.group();
        bigPoints.enableBody = true;
        bigPoints.create(40, 160, 'bigPoint');
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

    death: function () {
        this.game.add.image(this.game.world.centerX - 200, this.game.world.centerY - 134, 'gameOver').alpha = 0.6;

        this.game.add.bitmapText(this.game.world.centerX - 180, this.game.world.centerY - 70, '8bitWonder', 'GAME OVER', 40);

        this.game.add.button(this.game.world.centerX - 150, this.game.world.centerY + 20, 'mediumButton', this.restart, this);
        this.game.add.bitmapText(this.game.world.centerX - 135, this.game.world.centerY + 50, '8bitWonder', 'Restart', 15);
        this.game.add.button(this.game.world.centerX + 20, this.game.world.centerY + 20, 'mediumButton', this.backToMenu, this);
        this.game.add.bitmapText(this.game.world.centerX + 35, this.game.world.centerY + 40, '8bitWonder', 'Quit', 30);
        this.game.add.bitmapText(this.game.world.centerX + 35, this.game.world.centerY + 40, '8bitWonder', 'Quit', 30);
        this.game.add.bitmapText(this.game.world.centerX - 75, this.game.world.centerY - 20, '8bitWonder', this.scoreText.text, 20);
        this.scoreText.kill();

        if (sessionStorage.getItem('soundEffect') === 'true') {
            soundDeath.play();
        }
        var emitter = this.game.add.emitter(0, 0, 1000);
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
            soundWin.stop();
        }
        this.state.start('MainMenu');
    },

    levelComplete: function () {
        door.animations.play('door');
        if (sessionStorage.getItem('soundEffect') === 'true') {
            soundWin.play('', 0, 1, false, false);
        }
        this.game.add.image(this.game.world.centerX - 200, this.game.world.centerY - 134, 'gameOver');
        this.game.add.bitmapText(this.game.world.centerX - 175, this.game.world.centerY - 70, '8bitWonder', 'Level Complete', 25);
        this.game.add.button(this.game.world.centerX - 150, this.game.world.centerY + 20, 'mediumButton', this.nextLevel, this);
        this.game.add.bitmapText(this.game.world.centerX - 135, this.game.world.centerY + 35, '8bitWonder', 'Next \nLevel', 20);
        this.game.add.button(this.game.world.centerX + 20, this.game.world.centerY + 20, 'mediumButton', this.backToMenu, this);
        this.game.add.bitmapText(this.game.world.centerX + 35, this.game.world.centerY + 40, '8bitWonder', 'Quit', 30);
        this.game.add.bitmapText(this.game.world.centerX - 75, this.game.world.centerY - 20, '8bitWonder', this.scoreText.text, 20);
        this.scoreText.kill();
    },

    nextLevel: function () {
        if (sessionStorage.getItem('soundEffect') === 'true') {
            soundWin.stop();
        }
        this.state.start('level3');
    }
};