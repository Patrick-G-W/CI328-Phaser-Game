console.log('Loading...');

var game;

game = new Phaser.Game(800, 600, Phaser.AUTO, ''); // declare game size and canvas

game.state.add('MainMenu', MainMenu); // add different states for the menus and levels
game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);
game.state.add('Options', Options);

game.state.start('MainMenu'); // first state will be the menu