var game = new Phaser.Game(

	800, 600, Phaser.AUTO, '',
	{
		preload: preload,
		create: create,
		update: update
	}
);
function preload()
{
	game.load.spritesheet('ButtonPlay', 'assets/AnimButton.png',220, 210);
	game.load.image('background', 'assets/background.png');
}

var button;
var background; 
	
function create()
{
	background = game.add.tileSprite(0, 0, 800, 600, 'background');
	
	button = game.add.button(game.world.centerX -120, 200, 'ButtonPlay', actionOnClick, this, 1, 2, 0);
	
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