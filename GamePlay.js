var game = new Phaser.Game(

	800, 600, Phaser.AUTO, '',
	{
		preload: preload,
		create: create,
		update: update
	}
);
//Cria as variáveis globais do jogo
var player;
var player2;
var platforms;
var itemBanana;
var numBanana = 5;
var pontuacao = 0;
var pontuacao2 = 0;
var pontuacaotxt;
var pontuacaotxt2;
var Tema_mp3;
var Bamana_mp3;
var background;	
var Nuvem;	

// Função que faz o pre carregamento dos sprites
function preload()
{
	game.load.image('ground', 'assets/chao.png');
	game.load.image('spr_nuvem', 'assets/Nuvem.png');
	game.load.image('blocks', 'assets/plataforma.png');
	game.load.image('bananas', 'assets/Banana.png');
	game.load.image('background', 'assets/sky.png');
	game.load.spritesheet('spr_playerMarrom', 'assets/PlayerMarrom.png',56.6, 53);
	game.load.spritesheet('spr_playerBranco', 'assets/PlayerBranco.png',56.6, 53);
	game.load.audio('tema_mp3', 'assets/Sons/tema.mp3');
	game.load.audio('Banana_mp3', 'assets/Sons/PegaBanana.mp3');
}
function create()
{
	//Instancia o background em cena
	background = game.add.tileSprite(0, 0, 800, 600, 'background');

	//estancia o tema mp3 do jogo.
	Tema_mp3 = game.sound.play('tema_mp3');
	Tema_mp3.play();
	
	//habilita a fisíca do jogo
	game.physics.startSystem(Phaser.Physics.ARCADE);
					
	pontuacaotxt = game.add.text(10,10, 'Bananas: 0',{'fontSize': '22px', 'fill': '#8B4513'});
	pontuacaotxt2 = game.add.text(650,10, 'Bananas: 0',{'fontSize': '22px', 'fill': '#696969'});

	//Cria um grupo para trabalhar com o chão do jogo
	platforms = game.add.group();
		
	//Habilita o corpo do chão
	platforms.enableBody = true;
		
	//Cria a variavel que recebe o grupo do chão
	var ground = platforms.create(0, game.world.height - 64, 'ground');
		
	//cria a escala do chão no jogo
	ground.scale.setTo(1, 1);
		
	//Torna o corpo dochão imóvel
	ground.body.immovable = true;
	
	//Estancia o sprite 		
	var ledge = platforms.create(550, 360, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(315, 450, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(60, 360, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(315, 270, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(60, 175, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(550, 175, 'blocks');
	ledge.body.immovable = true;
			
	//adiciona o sprite do player e ajusta a altura inicial do player
	player = game.add.sprite(730, game.world.height - 150, 'spr_playerMarrom');
		
	//Habilita a fisíca do player
	game.physics.arcade.enable(player);
		
	//Ajusta como o player irá quicar quando cair
	player.body.bounce.y = 0.0;
		
	//Ajusta a gravidade do player
	player.body.gravity.y = 1000;
		
	//Cria limites para o player não ultrapassar as laterais do jogo
	player.body.collideWorldBounds = true;
		
	//Cria a animação do player para a direita e esquerda
	player.animations.add('left', [7, 6, 5, 4, 3, 2, 1, 0], 22, true);
	player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16], 22, true);
			
	//Player 2
	player2 = game.add.sprite(13, game.world.height - 150, 'spr_playerBranco');
	game.physics.arcade.enable(player2);
	player2.body.bounce.y = 0.0;
	player2.body.gravity.y = 1000;
	player2.body.collideWorldBounds = true;
		
			
	player2.animations.add('left', [7, 6, 5, 4, 3, 2, 1, 0], 22, true);
	player2.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16], 22, true);
		
	//Captura o teclado para a movimentação do player
	cursors = game.input.keyboard.createCursorKeys();
	
	spawnaBanana();		
}
						
function update()
{
	//Cria a varial que detecta a colisão entre o player e o chão
	var hitPlatform = game.physics.arcade.collide(player, platforms);			
	game.physics.arcade.collide(itemBanana, platforms);		
	game.physics.arcade.overlap(player, itemBanana, coleta2, null, this);				
					
	//ajusta a velocidade inical do player
	player.body.velocity.x = 0;
	player2.body.velocity.x = 0;
				
	if(cursors.left.isDown)
	{
		//verifica se a tleca para a esquerda foi pressionada
		player.body.velocity.x = -300;
		player.animations.play('left');
	}
	else if(cursors.right.isDown)
	{
		//verifica se a tecla da direita foi pressionada
		player.body.velocity.x = 300;
		player.animations.play('right');
	}
	else
	{
		//Verifica se o player está parado
		player.animations.stop();
		player.frame =7;
	}
				
	if(cursors.up.isDown && player.body.touching.down && hitPlatform)
	{
		//verifica se o player esta em contato com o chão e ajusta o pulo
		player.body.velocity.y = -450;	
	}	
			
	//Player2
	var hitPlatform2 = game.physics.arcade.collide(player2, platforms);
	game.physics.arcade.overlap(player2, itemBanana, coleta, null, this);
	
	
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
			
	if(leftKey.isDown)
	{
		player2.body.velocity.x = -300;
		player2.animations.play('left');
	}
	else if(rightKey.isDown)
	{
		player2.body.velocity.x = 300;
		player2.animations.play('right');
	}
	else
	{
		player2.animations.stop();
		player2.frame = 8;
	}
				
	if(upKey.isDown && player2.body.touching.down && hitPlatform2)
	{
		player2.body.velocity.y = -450;	
	}
	if(pontuacao == 15)
	{
		window.location.replace("fimjogop2.html");	
	}
	else if(pontuacao2 == 15)
	{
		window.location.replace("fimjogop1.html");	
	}
}
function coleta(player, itemBanana)
{
	pontuacao += 1;
	itemBanana.kill();
	numBananaitem =	(Math.floor(Math.random() * 6 / 1));
	pontuacaotxt.text = "Bananas: " + pontuacao;
	spawnaBanana();
	Banana_mp3 = game.sound.play('Banana_mp3');
	Banana_mp3.play();
}
		
		
function coleta2(player2, itemBanana)
{
	pontuacao2 += 1;
	itemBanana.kill();
	numBananaitem =	(Math.floor(Math.random() * 6 / 1));
	pontuacaotxt2.text = "Bananas: " + pontuacao2;
	spawnaBanana();
	Banana_mp3 = game.sound.play('Banana_mp3');
	Banana_mp3.play();
}

function spawnaBanana()
{
	//criando a banana
	itemBanana = game.add.group();
			
	itemBanana.enableBody = true;
			
	//Gera numeros randomicos.
	numBananaitem =	(Math.floor(Math.random() * 6 / 1));
	
	//cria a banana aleatoria mente no mapa
	switch(numBananaitem)
	{
		case 0:
			//instacia a banana
			var banana1 = itemBanana.create(120, 30, 'bananas');
			banana1.body.gravity.y = 300;
			break;
			
				
		case 1:
			var banana2 = itemBanana.create(370,40, 'bananas');
			banana2.body.gravity.y = 300;
			break;
		
							
		case 2:
			var banana3 = itemBanana.create(600, 30, 'bananas');
			banana3.body.gravity.y = 300;
			break;
		
						
		case 3:
			var banana4 = itemBanana.create(120, 200, 'bananas');
			banana4.body.gravity.y = 300;
			break;
		
					
		case 4:
			var banana5 = itemBanana.create(370, 300, 'bananas');
			banana5.body.gravity.y = 300;
			break;
			
					
		case 5:
			var banana6 = itemBanana.create(600, 200, 'bananas');
			banana6.body.gravity.y = 300;
			break;
			
	}	
	
}	