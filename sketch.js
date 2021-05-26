//Create variables here
var dog, dogImg, dogImg1, database, foodS, foodStock=0;
var feed, addFood;
var foodOBJ;
var fedTime, lastFed
function preload() {
	//load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database(); 
  createCanvas(1000, 500);
  foodStock = database.ref("FOOD");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(750,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed= createButton("Feed the Dog");
  feed.position(850,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(950,95);
  //addFood.mousePressed(addFoods);

  foodOBJ= new Food();
  foodOBJ.getFoodStock();

}


function draw() {  
    background("green");
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImg1);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
    // if(foodS === 0){
    //   foodS=20
    // }
  
    drawSprites();
    //add styles here
    textSize(20);
    fill(255);
  //   text("Note: Press UP ARROW to feed DRAGO milk", 50, 50);
    text("Food Remaining:"+foodS, 150,100);

    foodOBJ.display();   



}

//function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    FOOD:x
  })
}

//function to read values in DB
function readStock(data){
  foodS=data.val();
}

function feedDog(){
  dog.addImage(dogImg1);
  var GStk=(foodOBJ.getFoodStock()-1);
  foodOBJ.updateFoodStock(GStk);
  database.ref('/').update({
    FOOD:foodOBJ.getFoodStock(),
    FeedTime:hour()
  })
}

// function addFoods(){
//   foodS++;
//   database.ref('/').update({
//     FOOD:foodS
//   })
// }


