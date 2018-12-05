console.log('Loading...');

var game;

game = new Phaser.Game(800, 600, Phaser.AUTO, ''); // declare game size and canvas

game.state.add('Menu', Menu); // add different states for the menus and levels
game.state.add('Game', Game);
game.state.add('Game2', Game2);
game.state.add('Game3', Game3);
game.state.add('Options', Options);

game.state.start('Menu'); // first state will be the menu