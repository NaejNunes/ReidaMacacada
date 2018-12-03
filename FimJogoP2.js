var game = new Phaser.Game(

	400, 300, Phaser.AUTO, '',
	{
		
		preload: preload,
		create: create,
		update: update
		
	}
);

 var vencedortxt;
 var Macaco;
 var Aplausos;

// Função que faz o pre carregamento dos sprites
function preload()
{
	game.load.image('player2', 'assets/Player2Vencedor.png');
	game.load.audio('macaco', 'assets/Sons/MacacoGritando.mp3');
	game.load.audio('aplausos', 'assets/Sons/Aplausos.mp3');
	
	game.load.spritesheet('ButtonPlay', 'assets/AnimButton.png', 62, 60);
}
			
function create()
{
	
	
	
	//Instacia sprite de macaco vencedor
	game.add.sprite(150,150, 'player2');
	vencedortxt = game.add.text(70,100, 'O Rei da Macacada',{'fontSize': '30px', 'fill': '#ffffff'});
	
	//Som de aplausos e macaco
	Macaco = game.sound.play('macaco');
	Aplausos = game.sound.play('aplausos');
	
	button = game.add.button(300, 220, 'ButtonPlay', actionOnClick, this, 0, 1, 2);
	
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
	window.location.replace("playgame.html");	
}				
function update()
{
		
}
		
