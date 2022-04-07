const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var ground, con, rope, bubble, food, rabbit, bunny, star, pointStar, button;
var bubble_img, bg_img, star_img, emptyStar_img, oneStar_img;


function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage("background.png");
  food = loadImage("melon.png");
  rabbit = loadImage("Rabbit-01.png");
  emptyStar_img = loadImage("g_star1.png");

  blink = loadAnimation("blink_1.png","blink_2.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(230,550,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;
  

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(230,height-90,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(6,{x:230,y:250});
  con = new Link(rope,fruit);

  button = createImg('cut_btn.png');
  button.position(210,250);
  button.size(50,50);
  button.mouseClicked(drop);

  star = createSprite(235,100);
  star.addImage(star_img);
  star.scale = 0.02;

  pointStar = createSprite(40,50);
  pointStar.addImage(emptyStar_img);
  pointStar.scale = 0.05;

  ellipseMode(RADIUS);

}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  rope.show();

  if(collide(fruit,bunny,80)==true)
  {
   remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');

  }
  
  if(collide(fruit,bubble,40) == true) {
    engine.world.gravity.y = -0.8;
    bubble.position.x = fruit.position.x;
    bubble.position.y = fruit.position.y;
    bubble.velocity.y = fruit.velocity.y;
  }

 /*if(fruit.isTouching(star)){
    pointStar.changeImage(star_img); // changeImage
    star.visible = false;
  }*/

  if (bubble.MousePressedOver){
    bubble.delete();
  }

  drawSprites();

}

function drop()
{
  rope.break();
  con.dettach();
  con = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
    {
      var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
         if(d<=x)
          {
           return true; 
           }

          else{
             return false;
          }
        }
}

