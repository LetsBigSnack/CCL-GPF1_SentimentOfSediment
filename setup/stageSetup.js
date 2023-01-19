//this file sets up your game (create the instances of your gameObjects)

//this has to be done always at first - for any game!


let gameManager = new GameManager();

let canvas = new Canvas("canvas");

let skeleton = new PlayerFigure("player", 352, 224, 64, 64, "images/character_spritesheett.png");
skeleton.setBoundaryOffsets(10,-10,5,-5);
skeleton.addAnimationInformation("walk_up", 39, 42);
skeleton.addAnimationInformation("walk_left", 51, 57)
skeleton.addAnimationInformation("walk_right", 21, 27);
skeleton.addAnimationInformation("walk_down", 7, 10);

skeleton.addAnimationInformation("idle_up", 38, 38);
skeleton.addAnimationInformation("idle_left", 50, 50);
skeleton.addAnimationInformation("idle_right", 20, 20);
skeleton.addAnimationInformation("idle_down", 7, 7);
let miniMap = new MiniMap("mini",canvas.canvasBoundaries.right-130,5,125,125);

gameManager.currentRoom.addEntity(miniMap);

gameManager.setUpRoom();
let startTime = performance.now();
requestAnimationFrame(gameManager.gameLoop);


