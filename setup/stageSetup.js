//this file sets up your game (create the instances of your gameObjects)

//this has to be done always at first - for any game!
let gameManager = new GameManager();


//now the actual setup for our actual game
let wallMap = [    
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

let canvas = new Canvas("canvas");
//let pacMan = new PlayerFigure("pacMan", 210, 210, 80, 80);
let skeleton = new PlayerFigure("player", 210, 308, 32, 32, "images/BODY_skeleton.png");
skeleton.addAnimationInformation("walk_up", 0, 8);
skeleton.addAnimationInformation("walk_left", 9, 17);
skeleton.addAnimationInformation("walk_right", 27, 35);
skeleton.addAnimationInformation("walk_down", 18, 26);

skeleton.addAnimationInformation("idle_up", 0, 0);
skeleton.addAnimationInformation("idle_left", 9, 9);
skeleton.addAnimationInformation("idle_right", 27, 27);
skeleton.addAnimationInformation("idle_down", 18, 18);

let enemy = new Enemy("enemy", 400, 308, 64, 64, "images/spider04.png");
enemy.addAnimationInformation("walk_left", 14, 19);
enemy.addAnimationInformation("walk_right", 34, 39);


function setupYummyDots() {
    for (let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            new YummyDot("nomNom", x * 100 + 40, y * 100 + 40, 20, 20);
        }
    }
} 

function setupWalls() {
    for (let y = 0; y < wallMap.length; y++) {
        for(let x = 0; x < wallMap[y].length; x++) {
            if (wallMap[y][x] == 1) {
                new Wall("obstacle", x * 64 , y * 36, 64, 36);
            }
        }
    }
} 

setupYummyDots();
setupWalls();

requestAnimationFrame(gameManager.gameLoop);


