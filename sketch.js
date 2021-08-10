var godzilla, godzilla_running, godzilla_collided, planet_destroyers_image, planet_destroyers, gamestate
var ground, invisibleGround, groundImage, y_d, guard_1, guard_2, guard_3, guard_4, guard_5, guard_6, guards, destroyers, chaos, life_after_death, death_is_none
//1 may be the default
var final_stand, theSequelWeDidntDeserve, final_thought, areYouSureAboutThis
gamestate=1
var score = 0 
function preload(){
  godzilla_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  godzilla_collided = loadAnimation("trex_collided.png");
  guard_1 = loadImage("obstacle1.png")
  guard_2 = loadImage("obstacle2.png")
  guard_3 = loadImage("obstacle3.png")
  guard_4 = loadImage("obstacle4.png")
  guard_5 = loadImage("obstacle5.png")
  guard_6 = loadImage("obstacle6.png")
  groundImage = loadImage("ground2.png");
  planet_destroyers_image = loadImage('cloud.png')
  death_is_none = loadSound("Sounds/jump.mp3")
  chaos = loadSound("Sounds/die.mp3")
  life_after_death = loadSound('Sounds/checkPoint.mp3')
  
}

function setup() {

  createCanvas(600,200)
  
  //create a godzilla sprite
  godzilla = createSprite(50,160,20,50);
  godzilla.addAnimation("running", godzilla_running);
  godzilla.addAnimation('label',godzilla_collided)
  godzilla.scale = 0.5;
  godzilla.debug = true
  godzilla.setCollider('circle',0,0,25)
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  guards=createGroup()
  destroyers=createGroup()
}
function creation_of_destruction(){
  y_d=random(10,70)
  if (frameCount%50==0){
    planet_destroyers = createSprite(630, y_d, 10, 10)
    planet_destroyers.addImage(planet_destroyers_image)
    planet_destroyers.velocityX=-3
    planet_destroyers.depth=godzilla.depth-1
    planet_destroyers.lifetime=210
    destroyers.add(planet_destroyers)
  }
}
function army_of_nations(){
  if (frameCount%60 == 0){
    var soliders = createSprite(650,170,10,50)
    soliders.scale=0.4
    soliders.velocityX=-(3*frameCount/60)
    var trick_or_treat = Math.round(random(1,6))
    switch(trick_or_treat){
      case 1: soliders.addImage(guard_1); break;
      case 2: soliders.addImage(guard_2); break;
      case 3: soliders.addImage(guard_3); break;
      case 4: soliders.addImage(guard_4); break;
      case 5: soliders.addImage(guard_5); break;
      case 6: soliders.addImage(guard_6); break;
    }
    guards.add(soliders)
  }
}
function draw() {
  //set background color
  background(random(1,255),random(1,255),random(1,255));
//  console.log(godzilla.y)
  godzilla.collide(invisibleGround)
  text('SCORE: '+score,300,100)
  if (gamestate==1){
    score=score+Math.round(getFrameRate()/60)
    creation_of_destruction()
    army_of_nations()
    ground.velocityX=-(4*frameCount/500)
    console.log(ground.velocityX)
    if(keyDown("space")&& godzilla.y >= 160) {
      godzilla.velocityY = -12;
      death_is_none.play()
    }
    godzilla.velocityY = godzilla.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (godzilla.isTouching(guards)){
      gamestate = 0
      chaos.play()
    
    }
    if (score%100 == 0 && score>90){
      life_after_death.play()
    }
  }
  else if (gamestate==0){
    godzilla.velocityY=0
    ground.velocityX=0
    guards.setVelocityXEach(0)
    destroyers.setVelocityXEach(0)
    guards.setLifetimeEach(-1)
    destroyers.setLifetimeEach(-1)
    godzilla.changeAnimation('label',godzilla_collided)
  }
  // jump when the space key is pressed
  
  //stop godzilla from falling down

  
  drawSprites();
  
}



