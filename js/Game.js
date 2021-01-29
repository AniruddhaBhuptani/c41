class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
    passedFinish= false;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getleaderboard();

    if(allPlayers !== undefined){
      background("#464646");
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish!==true){
      player.distance +=10
      player.update();
    }
   
    if (player.distance>2000&&passedFinish===false){
      Player.updateleaderboard()
      player.rank=leaderboard
      player.update()
      passedFinish=true;
    }
      
    drawSprites();
  }
 ranks ()
 {
  
  background("black")
  Player.getPlayerInfo()
  camera.position.x=0
  camera.position.y=0
  image(bronze,displayWidth/-4,displayHeight/9-100,200,200)
  image(silver,displayWidth/4,displayHeight/10-100,250,250)
  image(gold,displayHeight-100,300,300)
  for (var plr in allPlayers){
    fill ("white")
    textAlign(CENTER)
    textSize(50)
    if (allPlayers[plr].rank===1){
      text("first"+allPlayers[plr].name,0,100)
    }
    if (allPlayers[plr].rank===2){
      text("second"+allPlayers[plr].name,displayWidth/4,displayHeight/9+80)
    }if (allPlayers[plr].rank===3){
      text("third"+allPlayers[plr].name,displayWidth/-4,displayHeight/10+75)
    }if (allPlayers[plr].rank===4){
      text("you lose"+allPlayers[plr].name,0,-250)
    }
  }



 }
  
 
}
