var startButton;
var optionsButton;

WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND, this.createText, this); },
    google: {
        families: ['Bangers']
    }
};

var Menu = {
    preload: function () {
        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('background', 'assets/menuBackground.jpg'); //https://www.freeimages.com/photo/jungle-1377573
        game.load.image('button', 'assets/button.png');
    },
    
    create: function () {
        var background = game.add.sprite(0, 0, 'background');
        startButton = this.add.button(game.world.centerX - 124, game.world.centerY, 'button', this.startGame, this);
        //optionsButton = this.add.button(10, 10, 'button', this.options, this);
        game.time.events.add(Phaser.Timer.SECOND, this.createText, this);
    },

    createText: function () {
        game.add.text(game.world.centerX - 110, game.world.centerY, 'Start Game', {
            align: 'center',
            fill:  '#234c8e',
            fontSize: '48px',
            font: 'Bangers'
        });

        game.add.text(game.world.centerX - 170, 200, 'Jungle Escape', {
            font: 'Bangers',
            fill: '#ff9900',
            fontSize: '72px'
        });
    },
    
    startGame: function () {
        this.state.start('Game');
    },

    //options: function () {
    //    this.state.start('Options');
    //}
};