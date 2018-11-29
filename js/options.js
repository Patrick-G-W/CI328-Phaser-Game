console.log('Options loaded');
var musicYes;
var musicNo;

var soundEffectsYes;
var soundEffectsNo;

var back;

WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND, this.createText, this); },
    google: {
        families: ['Bangers']
    }
};

var Options = {
    preload: function () {
        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('menu', 'assets/menuBackground.jpg'); //https://www.freeimages.com/photo/jungle-1377573
        game.load.image('button', 'assets/button.png');
        game.load.image('smolButton', 'assets/smolButton.png');
        game.load.image('smolButtonSelected', 'assets/smolButtonSelected.png');
        game.load.json('textStyle', 'json/optionsTextStyle.json');
    },

    create: function () {
        var background = game.add.sprite(0, 0, 'background');
        game.time.events.add(Phaser.Timer.SECOND, this.createText, this);
        musicYes = this.add.button(game.world.centerX + 40, game.world.centerY - 110, 'smolButton', this.allowMusic, this);
        musicNo = this.add.button(game.world.centerX + 125, game.world.centerY - 110, 'smolButton', this.disallowMusic, this);
        soundEffectsYes = this.add.button(game.world.centerX + 40, game.world.centerY - 10, 'smolButton', this.allowSoundEffects, this);
        soundEffectsNo = this.add.button(game.world.centerX + 125, game.world.centerY - 10, 'smolButton', this.disallowSoundEffects, this);
        back = this.add.button(game.world.centerX - 124, game.world.centerY + 100, 'button', this.back, this);
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
        var textStyle = game.cache.getJSON('textStyle');

        game.add.text(game.world.centerX - 200, game.world.centerY - 100, 'Enable music?', textStyle);

        game.add.text(game.world.centerX + 47, game.world.centerY - 95, 'Yes', textStyle);

        game.add.text(game.world.centerX + 137, game.world.centerY - 95, 'No', textStyle);

        game.add.text(game.world.centerX - 310, game.world.centerY, 'Enable sound effects?', textStyle);

        game.add.text(game.world.centerX + 47, game.world.centerY + 5, 'Yes', textStyle);

        game.add.text(game.world.centerX + 137, game.world.centerY + 5, 'No', textStyle);

        game.add.text(game.world.centerX - 50, game.world.centerY + 105, 'Back', {
            align: 'center',
            fill: '#234c8e',
            fontSize: '48px',
            font: 'Bangers'
        });
    },

    back: function () {
        this.state.start('Menu');
    }
};