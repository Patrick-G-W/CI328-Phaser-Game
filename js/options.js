console.log('Options loaded');
var musicYes;
var musicNo;

var soundEffectsYes;
var soundEffectsNo;

var back;

var Options = {
    preload: function () {
        this.game.load.image('menu', 'assets/menuBackground.jpg'); //https://www.freeimages.com/photo/jungle-1377573
        this.game.load.image('button', 'assets/button.png');
        this.game.load.image('smolButton', 'assets/smolButton.png');
        this.game.load.image('smolButtonSelected', 'assets/smolButtonSelected.png');
        this.game.load.bitmapFont('8bitWonder', 'assets/8bitWonder.png', 'assets/8bitWonder.fnt');
    },

    create: function () {
        this.game.add.sprite(0, 0, 'background');

        musicYes = this.add.button(this.game.world.centerX + 40, this.game.world.centerY - 110, 'smolButton', this.allowMusic, this);
        musicNo = this.add.button(this.game.world.centerX + 125, this.game.world.centerY - 110, 'smolButton', this.disallowMusic, this);
        soundEffectsYes = this.add.button(this.game.world.centerX + 40, this.game.world.centerY - 10, 'smolButton', this.allowSoundEffects, this);
        soundEffectsNo = this.add.button(this.game.world.centerX + 125, this.game.world.centerY - 10, 'smolButton', this.disallowSoundEffects, this);
        back = this.add.button(this.game.world.centerX - 124, this.game.world.centerY + 100, 'button', this.back, this);
        this.createText();
        sessionStorage.setItem('music', 'true'); // use a cookie to hold the users data
        sessionStorage.setItem('soundEffect', 'true');
    },

    allowMusic: function () {
        sessionStorage.setItem('music', 'true'); // set music cookie to equal true
        musicYes = this.add.button(this.game.world.centerX + 40, this.game.world.centerY - 110, 'smolButtonSelected', this.allowMusic, this);
        musicNo = this.add.button(this.game.world.centerX + 125, this.game.world.centerY - 110, 'smolButton', this.disallowMusic, this);
        this.createText(); // re-initialize the function so that it writes the text on top of the buttons again
    },

    disallowMusic: function () {
        sessionStorage.setItem('music', 'false');
        musicNo = this.add.button(this.game.world.centerX + 125, this.game.world.centerY - 110, 'smolButtonSelected', this.disallowMusic, this);
        musicYes = this.add.button(this.game.world.centerX + 40, this.game.world.centerY - 110, 'smolButton', this.allowMusic, this);
        this.createText();
    },

    allowSoundEffects: function () {
        sessionStorage.setItem('soundEffect', 'true');
        soundEffectsYes = this.add.button(this.game.world.centerX + 40, this.game.world.centerY - 10, 'smolButtonSelected', this.allowSoundEffects, this);
        soundEffectsNo = this.add.button(this.game.world.centerX + 125, this.game.world.centerY - 10, 'smolButton', this.disallowSoundEffects, this);
        this.createText();
    },

    disallowSoundEffects: function () {
        sessionStorage.setItem('soundEffect', 'false');
        soundEffectsNo = this.add.button(this.game.world.centerX + 125, this.game.world.centerY - 10, 'smolButtonSelected', this.disallowSoundEffects, this);
        soundEffectsYes = this.add.button(this.game.world.centerX + 40, this.game.world.centerY - 10, 'smolButton', this.allowSoundEffects, this);
        this.createText();
    },

    createText: function () {
        this.game.add.bitmapText(this.game.world.centerX - 330, this.game.world.centerY - 90, '8bitWonder', 'Enable music', 30);

        this.game.add.bitmapText(this.game.world.centerX + 47, this.game.world.centerY - 85, '8bitWonder', 'Yes', 20);

        this.game.add.bitmapText(this.game.world.centerX + 140, this.game.world.centerY - 85, '8bitWonder', 'No', 20);

        this.game.add.bitmapText(this.game.world.centerX - 350, this.game.world.centerY + 15, '8bitWonder', 'Enable sound effects', 20);

        this.game.add.bitmapText(this.game.world.centerX + 47, this.game.world.centerY + 15, '8bitWonder', 'Yes', 20);

        this.game.add.bitmapText(this.game.world.centerX + 140, this.game.world.centerY + 15, '8bitWonder', 'No', 20);

        this.game.add.bitmapText(this.game.world.centerX - 50, this.game.world.centerY + 120, '8bitWonder', 'Back', 30);
    },

    back: function () {
        this.state.start('MainMenu'); // goes back to the menu
    }
};