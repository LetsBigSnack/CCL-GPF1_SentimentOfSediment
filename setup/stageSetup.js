//this file sets up your game (create the instances of your gameObjects)

//this has to be done always at first - for any game!
let music = new Audio("Sounds/The_Cave_of_Ultimate_Doom.mp3");
let caveAmbiance = new Audio("Sounds/Ambience, Zinc Mine, Running Water Distant Cave Underground.wav");
let caveAmbiance2 = new Audio("Sounds/Cavern Sound effect_Short - Loop.wav");
let caveAmbiance3 = new Audio("Sounds/Drone Airy Cavern.wav");
music.volume = 0.25;
music.loop = true;

caveAmbiance.volume = 0.1;
caveAmbiance.loop = true;

caveAmbiance2.volume = 0.1;
caveAmbiance2.loop = true;

caveAmbiance3.volume = 0.1;
caveAmbiance3.loop = true;

let canPlaySound = false;
let changedSound = false;
document.body.addEventListener('click', () => {
    canPlaySound = true;
})



let gameManager = new GameManager();

let canvas = new Canvas("canvas");

let playerFigure = new PlayerFigure("player", 352, 224, 64, 64, "images/character_spritesheett.png");
playerFigure.setBoundaryOffsets(15,-15,10,-5);
playerFigure.addAnimationInformation("walk_up", 39, 42);
playerFigure.addAnimationInformation("walk_left", 51, 57)
playerFigure.addAnimationInformation("walk_right", 21, 27);
playerFigure.addAnimationInformation("walk_down", 7, 10);

playerFigure.addAnimationInformation("idle_up", 38, 38);
playerFigure.addAnimationInformation("idle_left", 50, 50);
playerFigure.addAnimationInformation("idle_right", 20, 20);
playerFigure.addAnimationInformation("idle_down", 7, 7);


playerFigure.addAnimationInformation("punch_front", 11, 19);
playerFigure.addAnimationInformation("punch_left", 58, 67);
playerFigure.addAnimationInformation("punch_right", 28, 37);
playerFigure.addAnimationInformation("punch_bottom", 43, 49);

let miniMap = new MiniMap("mini",canvas.canvasBoundaries.right-130,5,125,125);
let playerUI = new PlayerNumbers("playerNumbers",canvas.canvasBoundaries.left+20,50,140,70);
let playerStats = new PlayerStats("playerStats",canvas.canvasBoundaries.left+20,canvas.canvasBoundaries.bottom-150,100,100);

gameManager.menuElements.push(new MainMenu("Title", 0,0,gameManager.canvas.canvasBoundaries.right,gameManager.canvas.canvasBoundaries.bottom, "images/Title_Screen.png"));
gameManager.menuElements.push(new MenuButton(MenuButton.buttonNames.Play, 47,198,320-47, 265-198));
gameManager.menuElements.push(new MenuButton(MenuButton.buttonNames.Story, 47,270,320-47, 265-198));
gameManager.menuElements.push(new MenuButton(MenuButton.buttonNames.HTP, 47,342,320-47, 265-198));
gameManager.menuElements.push(new MenuButton(MenuButton.buttonNames.Credits, 47,413,320-47, 265-198));
requestAnimationFrame(gameManager.gameLoop);


