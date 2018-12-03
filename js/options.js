console.log('Options loaded');
var musicYes;
var musicNo;

var soundEffectsYes;
var soundEffectsNo;

var back;

var Options = {
    preload: function () {
        game.load.image('menu', 'assets/menuBackground.jpg'); //https://www.freeimages.com/photo/jungle-1377573
        game.load.image('button', 'assets/button.png');
        game.load.image('smolButton', 'assets/smolButton.png');
        game.load.image('smolButtonSelected', 'assets/smolButtonSelected.png');
        game.load.bitmapFont('8bitWonder', 'assets/8bitWonder.png', 'assets/8bitWonder.fnt');
    },

    create: function () {
        var background = game.add.sprite(0, 0, 'background');

        musicYes = this.add.button(game.world.centerX + 40, game.world.centerY - 110, 'smolButton', this.allowMusic, this);
        musicNo = this.add.button(game.world.centerX + 125, game.world.centerY - 110, 'smolButton', this.disallowMusic, this);
        soundEffectsYes = this.add.button(game.world.centerX + 40, game.world.centerY - 10, 'smolButton', this.allowSoundEffects, this);
        soundEffectsNo = this.add.button(game.world.centerX + 125, game.world.centerY - 10, 'smolButton', this.disallowSoundEffects, this);
        back = this.add.button(game.world.centerX - 124, game.world.centerY + 100, 'button', this.back, this);
        this.createText();
        sessionStorage.setItem('music', 'true');
        sessionStorage.setItem('soundEffect', 'true');
    },

    update: function () {
        
    },

    render: function () {

    },

    allowMusic: function () {
        sessionStorage.setItem('music', 'true');
        musicYes = this.add.button(game.world.centerX + 40, game.world.centerY - 110, 'smolButtonSelected', this.allowMusic, this);
        musicNo = this.add.button(game.world.centerX + 125, game.world.centerY - 110, 'smolButton', this.disallowMusic, this);
        this.createText();
    },

    disallowMusic: function () {
        sessionStorage.setItem('music', 'false');
        musicNo = this.add.button(game.world.centerX + 125, game.world.centerY - 110, 'smolButtonSelected', this.disallowMusic, this);
        musicYes = this.add.button(game.world.centerX + 40, game.world.centerY - 110, 'smolButton', this.allowMusic, this);
        this.createText();
    },

    allowSoundEffects: function () {
        sessionStorage.setItem('soundEffect', 'true');
        soundEffectsYes = this.add.button(game.world.centerX + 40, game.world.centerY - 10, 'smolButtonSelected', this.allowSoundEffects, this);
        soundEffectsNo = this.add.button(game.world.centerX + 125, game.world.centerY - 10, 'smolButton', this.disallowSoundEffects, this);
        this.createText();
    },

    disallowSoundEffects: function () {
        sessionStorage.setItem('soundEffect', 'false');
        soundEffectsNo = this.add.button(game.world.centerX + 125, game.world.centerY - 10, 'smolButtonSelected', this.disallowSoundEffects, this);
        soundEffectsYes = this.add.button(game.world.centerX + 40, game.world.centerY - 10, 'smolButton', this.allowSoundEffects, this);
        this.createText();
    },

    createText: function () {
        game.add.bitmapText(game.world.centerX - 330, game.world.centerY - 90, '8bitWonder', 'Enable music', 30);

        game.add.bitmapText(game.world.centerX + 47, game.world.centerY - 85, '8bitWonder', 'Yes', 20);

        game.add.bitmapText(game.world.centerX + 140, game.world.centerY - 85, '8bitWonder', 'No', 20);

        game.add.bitmapText(game.world.centerX - 350, game.world.centerY + 15, '8bitWonder', 'Enable sound effects', 20);

        game.add.bitmapText(game.world.centerX + 47, game.world.centerY + 15, '8bitWonder', 'Yes', 20);

        game.add.bitmapText(game.world.centerX + 140, game.world.centerY + 15, '8bitWonder', 'No', 20);

        game.add.bitmapText(game.world.centerX - 50, game.world.centerY + 120, '8bitWonder', 'Back', 30);
    },

    back: function () {
        this.state.start('Menu');
    }
};