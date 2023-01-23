//this file sets up your game (create the instances of your gameObjects)

//this has to be done always at first - for any game!


let gameManager = new GameManager();

let canvas = new Canvas("canvas");

let skeleton = new PlayerFigure("player", 352, 224, 64, 64, "images/character_spritesheett.png");
skeleton.setBoundaryOffsets(15,-15,10,-5);
skeleton.addAnimationInformation("walk_up", 39, 42);
skeleton.addAnimationInformation("walk_left", 51, 57)
skeleton.addAnimationInformation("walk_right", 21, 27);
skeleton.addAnimationInformation("walk_down", 7, 10);

skeleton.addAnimationInformation("idle_up", 38, 38);
skeleton.addAnimationInformation("idle_left", 50, 50);
skeleton.addAnimationInformation("idle_right", 20, 20);
skeleton.addAnimationInformation("idle_down", 7, 7);
let miniMap = new MiniMap("mini",canvas.canvasBoundaries.right-130,5,125,125);
let playerUI = new PlayerNumbers("playerNumbers",canvas.canvasBoundaries.left+20,100,140,70);
let playerStats = new PlayerStats("playerStats",canvas.canvasBoundaries.left+20,200,100,100)
gameManager.currentRoom.addEntity(miniMap);
gameManager.currentRoom.addEntity(playerUI);
gameManager.currentRoom.addEntity(playerStats);

gameManager.menuElements.push(new MainMenu("Title", 0,0,gameManager.canvas.canvasBoundaries.right,gameManager.canvas.canvasBoundaries.bottom, "images/Title_Screen.png"));
gameManager.menuElements.push(new MenuButton("Play", 47,198,320-47, 265-198));
gameManager.menuElements.push(new MenuButton("Story", 47,270,320-47, 265-198));
gameManager.menuElements.push(new MenuButton("How to play", 47,342,320-47, 265-198));
gameManager.menuElements.push(new MenuButton("Credits", 47,413,320-47, 265-198));
gameManager.setUpRoom();
let startTime = performance.now();


requestAnimationFrame(gameManager.gameLoop);


