var balloon,balloonImage1;
var database, balloon, position;
var edges;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1350,646);

  balloon=createSprite(675,323,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
  var Position = database.ref("balloon/position");
  Position.on("value", readPosition, showError);
}

// function to display UI
function draw() {
  background(bg);
  edges = createEdgeSprites();

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    changePosition(-10, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    changePosition(10, 0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    changePosition(0, -10);
    if (balloon.scale >0.3){ 
      balloon.scale = balloon.scale-0.05;
    }
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    changePosition(0, 10);
    if (balloon.scale <1.2){ 
      balloon.scale = balloon.scale+0.05;
    }
  }
  balloon.collide(edges)
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  }
  
  function changePosition(x, y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y,
  })
  }
  
  function showError(){
    console.log("Error-404");
  }
