var monkeyImages, monkey;
var stoneImage, stone;
var bananaImage, banana;
var jungle, jungleImage;
var inviGround;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var life = 3;

function preload() {
  monkeyImages = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");

  stoneImage = loadImage("stone.png");

  jungleImage = loadImage("jungle.jpg");

}

function setup() {
  createCanvas(600, 300);

  jungle = createSprite(60, 0, 200, 100);
  jungle.addImage("jungle", jungleImage);
  jungle.scale = 1.5;
  jungle.x = jungle.width / 2
  jungle.velocityX = -5;

  monkey = createSprite(100, 250, 20, 10);
  monkey.addAnimation("running", monkeyImages);
  monkey.scale = 0.08;

  inviGround = createSprite(280, 300, 600, 80);
  inviGround.visible = false;



  stones = createGroup();
  food = createGroup();
}


function draw() {
  background(255);
  monkey.collide(inviGround);
  if (gameState == PLAY) {
    monkey.visible = true;
    if (jungle.x < 0) {
      jungle.x = jungle.width / 2
    }
    jungle.velocityX = -6 - score / 15;



    if (keyDown("space") && monkey.y > 208) {
      monkey.velocityY = -12
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    if (food.isTouching(monkey)) {
      score += 2
      food.destroyEach();
    }

    if (stones.isTouching(monkey)) {
      monkey.scale = 0.02;
      life = life - 1;
      stones.destroyEach();
    }
    createBananas();
    createStones();
    if (monkey.scale < 0.08) {
      monkey.scale = 0.08
    }
    switch (score) {
      case 10:
        score += 2
        monkey.scale += 0.02
        score += 2
        break;
      case 20:
        score += 2
        monkey.scale += 0.02
        break;
      case 30:
        monkey.scale += 0.02
        score += 2
        break;
      case 40:
        score += 2
        monkey.scale += 0.02
        break;

      default:
        break;
    }
    if (life === 0) {
      gameState = END;
    }
  } else if (gameState == END) {


    stones.destroyEach();
    food.destroyEach();
    jungle.velocityX = 0;
    monkey.visible = false;

  }


  drawSprites();
  textSize(20);
  text("SCORE: " + score, 380, 20);
  text("LIVES: " + life, 80, 20);


}

function createBananas() {
  if (frameCount % 80 == 0) {
    banana = createSprite(600, random(120, 200), 30, 10);
    banana.addImage("static", bananaImage);
    banana.scale = 0.04;
    banana.velocityX = -(10 + score / 15);
    banana.lifetime = 60;

    food.add(banana);
  }
}

function createStones() {
  if (frameCount % 100 == 0) {
    stone = createSprite(600, 250, 30, 10);
    stone.addImage("static", stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -(10 + score / 15);
    stone.lifetime = 60;
    stones.add(stone);
  }
}