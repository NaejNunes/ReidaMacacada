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

// Função que faz o pre carregamento dos sprites
function preload()
{
	game.load.image('ground', 'assets/platform.png');
	game.load.image('blocks', 'assets/plataforma1.png');
	game.load.image('bananas', 'assets/banana.png');
	game.load.image('background', 'assets/sky.png');
	game.load.image('MK', 'assets/reidabanana.png');
	game.load.spritesheet('spr_player', 'assets/player.png',28.7, 30);
	game.load.spritesheet('spr_player2', 'assets/macaco32p2.png',28.7, 30);
	game.load.audio('tema_mp3', 'assets/Sons/tema.mp3');
	game.load.audio('Banana_mp3', 'assets/Sons/PegaBanana.mp3');
}
function create()
{
	background = game.add.tileSprite(0, 0, 800, 600, 'background');
	
	game.add.sprite(0,0, 'MK');
	//estancia o tema mp3 do jogo.
	Tema_mp3 = game.sound.play('tema_mp3');
	Tema_mp3.play();
	
	//habilita a fisíca do jogo
	game.physics.startSystem(Phaser.Physics.ARCADE);
			
	//Adiciona o sprite de background do jogo
	//game.add.sprite(0, 0, 'sky');
			
	pontuacaotxt = game.add.text(10,10, 'Bananas: 0',{'fontSize': '14px', 'fill': '#8B4513'});
	pontuacaotxt2 = game.add.text(300,10, 'Bananas: 0',{'fontSize': '14px', 'fill': '#696969'});

	//Cria um grupo para trabalhar com o chão do jogo
	platforms = game.add.group();
		
	//Habilita o corpo do chão
	platforms.enableBody = true;
		
	//Cria a variavel que recebe o grupo do chão
	var ground = platforms.create(0, game.world.height - 64, 'ground');
		
	//cria a escala do chão no jogo
	ground.scale.setTo(2, 2);
		
	//Torna o corpo dochão imóvel
	ground.body.immovable = true;
	
	//Estancia o sprite 		
	var ledge = platforms.create(40, 160, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(290, 160, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(160, 200, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(160, 120, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(40, 80, 'blocks');
	ledge.body.immovable = true;
			
	ledge = platforms.create(290, 80, 'blocks');
	ledge.body.immovable = true;
			
	//adiciona o sprite do player e ajusta a altura inicial do player
	player = game.add.sprite(600, game.world.height - 90, 'spr_player');
		
	//Habilita a fisíca do player
	game.physics.arcade.enable(player);
		
	//Ajusta como o player irá quicar quando cair
	player.body.bounce.y = 0.1;
		
	//Ajusta a gravidade do player
	player.body.gravity.y = 1100;
		
	//Cria limites para o player não ultrapassar as laterais do jogo
	player.body.collideWorldBounds = true;
		
	//Cria a animação do player para a direita e esquerda
	player.animations.add('left', [0, 1, 2, 3, 4], 12, true);
	player.animations.add('right', [5, 6, 7, 8, 9], 12, true);
			
	//Player 2
	player2 = game.add.sprite(10, game.world.height - 90, 'spr_player2');
	game.physics.arcade.enable(player2);
	player2.body.bounce.y = 0.1;
	player2.body.gravity.y = 1100;
	player2.body.collideWorldBounds = true;
		
			
	player2.animations.add('left', [0, 1, 2, 3, 4], 12, true);
	player2.animations.add('right', [5, 6, 7, 8, 9], 12, true);
		
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
		player.body.velocity.x = -150;
		player.animations.play('left');
	}
	else if(cursors.right.isDown)
	{
		//verifica se a tecla da direita foi pressionada
		player.body.velocity.x = 150;
		player.animations.play('right');
	}
	else
	{
		//Verifica se o player está parado
		player.animations.stop();
		player.frame =4;
	}
				
	if(cursors.up.isDown && player.body.touching.down && hitPlatform)
	{
		//verifica se o player esta em contato com o chão e ajusta o pulo
		player.body.velocity.y = -350;	
	}	
			
	//Player2
	var hitPlatform2 = game.physics.arcade.collide(player2, platforms);
	game.physics.arcade.overlap(player2, itemBanana, coleta, null, this);
	
	
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
			
	if(leftKey.isDown)
	{
		player2.body.velocity.x = -150;
		player2.animations.play('left');
	}
	else if(rightKey.isDown)
	{
		player2.body.velocity.x = 150;
		player2.animations.play('right');
	}
	else
	{
		player2.animations.stop();
		player2.frame = 5;
	}
				
	if(upKey.isDown && player2.body.touching.down && hitPlatform2)
	{
		player2.body.velocity.y = -350;	
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
			var banana1 = itemBanana.create(60, 40, 'bananas');
			banana1.body.gravity.y = 300;
			break;
					
		case 1:
			var banana2 = itemBanana.create(180,50, 'bananas');
			banana2.body.gravity.y = 300;
			break;
							
		case 2:
			var banana3 = itemBanana.create(310, 40, 'bananas');
			banana3.body.gravity.y = 300;
			break;
						
		case 3:
			var banana4 = itemBanana.create(60, 100, 'bananas');
			banana4.body.gravity.y = 300;
			break;
						
		case 4:
			var banana5 = itemBanana.create(180, 140, 'bananas');
			banana5.body.gravity.y = 300;
			break;
				
		case 5:
			var banana6 = itemBanana.create(310, 100, 'bananas');
			banana6.body.gravity.y = 300;
			break;
	}	
}	