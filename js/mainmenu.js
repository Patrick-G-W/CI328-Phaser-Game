console.log('Menu loaded');

var startButton;
var optionsButton;

var MainMenu = {
    preload: function () {
        this.game.load.image('background', 'assets/menuBackground.jpg'); //https://www.freeimages.com/photo/jungle-1377573
        this.game.load.image('button', 'assets/button.png');
        this.game.load.bitmapFont('goodDog', 'assets/goodDog.png', 'assets/goodDog.fnt');
        this.game.load.bitmapFont('8bitWonder', 'assets/8bitWonder.png', 'assets/8bitWonder.fnt');
    },
    
    create: function () {
        this.game.add.sprite(0, 0, 'background');
        startButton = this.add.button(this.game.world.centerX - 124, this.game.world.centerY, 'button', this.startGame, this);
        optionsButton = this.add.button(this.game.world.centerX - 124, this.game.world.centerY + 100, 'button', this.options, this);
        this.createText(); // load last so they are rendered on top of the buttons above
    },

    createText: function () {
        this.game.add.bitmapText(this.game.world.centerX - 95, this.game.world.centerY + 25, '8bitWonder', 'Start game', 20);

        this.game.add.bitmapText(this.game.world.centerX - 250, this.game.world.centerY - 150, 'goodDog', 'Jungle Escape', 120);

        this.game.add.bitmapText(this.game.world.centerX - 95, this.game.world.centerY + 120, '8bitWonder', 'Options', 30);
    },
    
    startGame: function () {
        this.state.start('level1');
    },

    options: function () {
        this.state.start('Options');
    }
};