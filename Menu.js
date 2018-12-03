var game = new Phaser.Game(

	400, 300, Phaser.AUTO, '',
	{
		preload: preload,
		create: create,
		update: update
	}
);
function preload()
{
	game.load.spritesheet('ButtonPlay', 'assets/AnimButton.png', 62, 60);
	game.load.image('background', 'assets/background.png');
}

var button;
var background; 
	
function create()
{
	background = game.add.tileSprite(0, 0, 400, 300, 'background');
	
	button = game.add.button(game.world.centerX -30, 130, 'ButtonPlay', actionOnClick, this, 0, 1, 2);
	
	button.onInputOver.add(over, this);
	button.onInputOut.add(out, this);
	button.onInputUp.add(up, this);
	
}	

function Over()
{
	console.log('button over', arguments);
}
function Out()
{
	console.log('button out');
}
function up()
{
	console.log('button up');
}

function actionOnClick()
{
	window.location.replace("Tutorial.html");	
}
					
function update()
{

}