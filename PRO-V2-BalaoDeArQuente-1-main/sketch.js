var backgroundImg, bg;
var bird, birdImg;
var frutas,frutasGroup, uva, morango, maça, limão;
var cano,canos, cano1, canoDuplo, canoGroup;
var paredes, parede, parede2;

var pontos;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var die, checkpoint;

function preload(){
  backgroundImg = loadImage("assets/bg.png");
  birdImg = loadImage("assets/bird.jpg");
  uva = loadImage("assets/uva.png");
  morango = loadImage("assets/morango.png");
  maça = loadImage("assets/maça.png")
  limão = loadImage("assets/limão.png");
  cano1 = loadImage("assets/cano1.png");
  canoDuplo = loadImage("assets/cano duplo.png");


  die = loadSound("assets/die.mp3");
  checkPoint = loadSound("assets/checkpoint.mp3");

}

function setup(){
  createCanvas(1000,400);

  bird = createSprite(100,200,20,50);
  bird.addImage("bird",birdImg);
  bird.scale = 0.1

  canos = new Group();
  frutasGroup = new Group();
  paredes= new Group();

  pontos = 0;

  

}


function draw(){
  
  background(backgroundImg);
  fill("black");
  textSize(20);
  text("pontuação: "+pontos,40,50);


  if(gameState===PLAY){
    
    if(keyWentDown(32)){
      bird.velocityY = -10; 
    }
    bird.velocityY +=2;
    if(frutasGroup.isTouching(bird)){
      for(var i=0;i<frutasGroup.length;i++){
        if(frutasGroup[i].isTouching(bird)){
          frutasGroup[i].destroy();
        pontos+=1;
        checkPoint.play();

        }
        
      }
    }
    if(paredes.isTouching(bird)){
      die.play();
      bird.destroy();
      gameState = "END";
      

      
    }

    if(bird.y  >= height){
      die.play();
      bird.destroy();
      gameState = "END";
    }





    criarCanos();
    criarFrutas();
    drawSprites();
  }

  if(gameState=== "END"){
    background(0);
    stroke("red");
    fill("white");
    textSize(40);
    text("Fim de Jogo", width/2 - 100, height/2);
  }


}

function criarCanos(){
  if(frameCount%60 === 0){
    y = Math.round(random(200,300));
     cano = createSprite(1450,y,40,40);
    cano.addImage("cano",canoDuplo);
    cano.scale = 1.2; 
    cano.velocityX = -6;
    cano.lifetime = 250;

    var parede = createSprite(1450, cano.y/2 - 50,40, 170);
    parede.x = cano.x;
    parede.velocityX = -6;

    var parede2 = createSprite(1450, cano.y/2 + 250, 40, 170);
    parede2.x = cano.x;
    parede2.velocityX = -6;
   parede.visible=false;  
   parede2.visible=false;


    paredes.add(parede);
    paredes.add(parede2);



   
    canos.add(cano);
    //cano.debug=true;
   
    
  }
}
function criarFrutas(){
  if(frameCount%60 ===0){
    var frutas = createSprite(cano.x,cano.y-30);
    frutas.scale = 0.2
    frutas.lifetime = 250;
    frutas.velocityX = -6;
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: frutas.addImage(uva);
      break;
      case 2: frutas.addImage(limão);
      break;
      case 3: frutas.addImage(maça);
      break;
      case 4: frutas.addImage(morango);
      break;
      default: break;

    } 
    frutasGroup.add(frutas);
  }
}










