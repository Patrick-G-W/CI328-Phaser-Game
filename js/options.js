console.log('Working');

WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND, this.createText, this); },
    google: {
        families: ['Bangers']
    }
};

var Options = {
    preload: function () {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('menu', 'assets/menuBackground.jpg'); //https://www.freeimages.com/photo/jungle-1377573
        game.load.image('button', 'assets/button.png');
    },

    create: function () {
        var background = game.add.sprite(0, 0, 'background');
    },

    update: function () {

    },

    render: function () {

    },
    
    createText: function () {
        
    }
};