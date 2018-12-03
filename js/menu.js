console.log('Menu loaded');

var startButton;
var optionsButton;

var Menu = {
    preload: function () {
        game.load.image('background', 'assets/menuBackground.jpg'); //https://www.freeimages.com/photo/jungle-1377573
        game.load.image('button', 'assets/button.png');
        game.load.bitmapFont('goodDog', 'assets/goodDog.png', 'assets/goodDog.fnt');
        game.load.bitmapFont('8bitWonder', 'assets/8bitWonder.png', 'assets/8bitWonder.fnt');
    },
    
    create: function () {
        var background = game.add.sprite(0, 0, 'background');
        startButton = this.add.button(game.world.centerX - 124, game.world.centerY, 'button', this.startGame, this);
        optionsButton = this.add.button(game.world.centerX - 124, game.world.centerY + 100, 'button', this.options, this);
        this.createText();
    },

    createText: function () {
        var textStyle = game.cache.getJSON('textStyle');
        game.add.bitmapText(game.world.centerX - 95, game.world.centerY + 25, '8bitWonder', 'Start Game', 20);

        game.add.bitmapText(game.world.centerX - 250, game.world.centerY - 150, 'goodDog', 'Jungle Escape', 120);

        game.add.bitmapText(game.world.centerX - 95, game.world.centerY + 120, '8bitWonder', 'Options', 30);
    },
    
    startGame: function () {
        this.state.start('Game');
    },

    options: function () {
        this.state.start('Options');
    }
};