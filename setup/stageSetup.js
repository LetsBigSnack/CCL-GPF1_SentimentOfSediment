//this file sets up your game (create the instances of your gameObjects)

//this has to be done always at first - for any game!
let enemy = new Enemy("enemy", 400, 308, 64, 64, "images/spider04.png");
enemy.addAnimationInformation("walk_left", 14, 19);
enemy.addAnimationInformation("walk_right", 34, 39);



let gameManager = new GameManager();

let canvas = new Canvas("canvas");

let skeleton = new PlayerFigure("player", 210, 308, 64, 64, "images/BODY_skeleton.png");
skeleton.addAnimationInformation("walk_up", 0, 8);
skeleton.addAnimationInformation("walk_left", 9, 17);
skeleton.addAnimationInformation("walk_right", 27, 35);
skeleton.addAnimationInformation("walk_down", 18, 26);

skeleton.addAnimationInformation("idle_up", 0, 0);
skeleton.addAnimationInformation("idle_left", 9, 9);
skeleton.addAnimationInformation("idle_right", 27, 27);
skeleton.addAnimationInformation("idle_down", 18, 18);



gameManager.setUpRoom();

requestAnimationFrame(gameManager.gameLoop);


