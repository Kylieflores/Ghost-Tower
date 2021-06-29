var ghost, door,climber, tower
var ghostimg, doorimg, climberimg, towerimg
var invisblock
var doorgroup, climbergroup, invisblockgroup
var gamestate="PLAY"
var  sky
function preload(){
  towerimg=loadImage("tower.png")
  ghostimg=loadImage("ghost-standing.png")
  doorimg=loadImage("door.png")
  climberimg=loadImage("climber.png")
}


function setup(){
  createCanvas(600,600)
  
  tower=createSprite(300,300,10,10)
  tower.addImage(towerimg)
  tower.velocityY=4
  ghost=createSprite(300,300,10,10)
  ghost.setCollider("rectangle",0,0,200,300)
  ghost.debug=false
  ghost.addImage(ghostimg)
  ghost.scale=0.3
  
  sky=createSprite(300,10,600,10)
  doorgroup=createGroup()
  climbergroup=createGroup()
  invisblockgroup=createGroup()
}
function draw(){
  background("yellow")
  if(gamestate=="PLAY"){
     if(tower.y>600){
     tower.y=300
     
     }
  if(keyDown("up")){
     ghost.velocityY=-10
     }
  ghost.velocityY=ghost.velocityY+0.5
  
  spawndoors()
    if(ghost.isTouching(invisblockgroup)||ghost.y>650){
       gamestate="END"
       }
  if(ghost.isTouching(climbergroup)){
     ghost.velocityY=0
     }
    if(keyDown("left")&&ghost.x>100){
       ghost.x=ghost.x-5
       }
    if(keyDown("right")&&ghost.x<500){
      ghost.x=ghost.x+5
    }
    
    ghost.collide(sky)
    sky.visible=false
    
  drawSprites()
     }
  if(gamestate=="END"){
     background("black")
    doorgroup.destroyEach()
    climbergroup.destroyEach()
    invisblockgroup.destroyEach()
    fill("red")
    textSize(30)
    text("YOU SUCK AT THIS GAME!!!:P",100,300)
     }
  
}

function spawndoors(){
  if(frameCount%70==0){
      door=createSprite(random(100,500),0,10,10)
  door.velocityY=5
door.addImage(doorimg)
    climber=createSprite(door.x,70,10,10)
    climber.velocityY=5
    climber.addImage(climberimg)
    ghost.depth=door.depth+1
    invisblock=createSprite(door.x,85,70,10)
    invisblock.velocityY=5
    doorgroup.add(door)
    climbergroup.add(climber)
      invisblockgroup.add(invisblock)
    invisblock.visible=false
     }
  
  
  
}
