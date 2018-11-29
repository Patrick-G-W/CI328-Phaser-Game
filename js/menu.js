console.log('Menu loaded');

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
        game.load.json('textStyle', 'json/menuTextStyle.json');
    },
    
    create: function () {
        var background = game.add.sprite(0, 0, 'background');
        startButton = this.add.button(game.world.centerX - 124, game.world.centerY, 'button', this.startGame, this);
        optionsButton = this.add.button(game.world.centerX - 124, game.world.centerY + 100, 'button', this.options, this);
        game.time.events.add(Phaser.Timer.SECOND, this.createText, this);
    },

    createText: function () {
        var textStyle = game.cache.getJSON('textStyle');
        game.add.text(game.world.centerX - 110, game.world.centerY + 10, 'Start Game', textStyle);

        game.add.text(game.world.centerX - 200, game.world.centerY - 100, 'Jungle Escape', {
            font: 'Bangers',
            fill: '#ff9900',
            fontSize: '72px'
        });

        game.add.text(game.world.centerX - 80, game.world.centerY + 110, 'Options', textStyle);
    },
    
    startGame: function () {
        this.state.start('Game');
    },

    options: function () {
        this.state.start('Options');
    }
};