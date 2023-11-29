let pressedKeys = {}

function keyDown(eventInformation) {

	pressedKeys[eventInformation.key] = true;

	switch (eventInformation.key) {
		case "w":
			playerFigure.moveBy.top = -playerFigure.moveVelocity;
			playerFigure.switchState(PlayerFigure.playerStates.Run_Front);
			break;
		case "a":
			playerFigure.moveBy.left = -playerFigure.moveVelocity;
			playerFigure.switchState(PlayerFigure.playerStates.Run_Left);

			break;
		case "d":
			playerFigure.moveBy.left = playerFigure.moveVelocity;
			playerFigure.switchState(PlayerFigure.playerStates.Run_Right);

			break;
		case "s":
			playerFigure.moveBy.top = playerFigure.moveVelocity;
			playerFigure.switchState(PlayerFigure.playerStates.Run_Bottom);

			//move down
			break;
		case "ArrowLeft":
			// Left pressed
			console.log("PlayerPunch Left");
			playerFigure.switchState(PlayerFigure.playerStates.Punch_Left);
			playerFigure.punch = "left";
			break;
		case "ArrowRight":
			// Right pressed
			console.log("PlayerPunch Right");
			playerFigure.switchState(PlayerFigure.playerStates.Punch_Right);
			playerFigure.punch = "right";
			break;
		case "ArrowUp":
			// Up pressed
			console.log("PlayerPunch Up");
			playerFigure.switchState(PlayerFigure.playerStates.Punch_Bottom);
			playerFigure.punch = "up";
			break;
		case "ArrowDown":
			// Down pressed
			console.log("PlayerPunch Down");
			playerFigure.switchState(PlayerFigure.playerStates.Punch_Front);
			playerFigure.punch = "down";
			break;
		case "e":

			playerFigure.bomb = true;
			break;
		case "Escape":
			gameManager.togglePause();
			break;
		case "o":
			// Toggle Debug Mode
			//gameManager.currentState = GameManager.states.Playing;
			break;
	}
}
window.addEventListener("keydown", keyDown);

function keyUp(eventInformation) {

	pressedKeys[eventInformation.key] = false;

	playerFigure.moveBy.top = 0;
	playerFigure.moveBy.left = 0;

	if(pressedKeys["w"]){
		playerFigure.moveBy.top = -playerFigure.moveVelocity;
		playerFigure.switchState(PlayerFigure.playerStates.Run_Front);
	}
	if(pressedKeys["a"]){
		playerFigure.moveBy.left = -playerFigure.moveVelocity;
		playerFigure.switchState(PlayerFigure.playerStates.Run_Left);
	}
	if(pressedKeys["s"]){
		playerFigure.moveBy.top = playerFigure.moveVelocity;
		playerFigure.switchState(PlayerFigure.playerStates.Run_Bottom);
	}
	if(pressedKeys["d"]){
		playerFigure.moveBy.left = playerFigure.moveVelocity;
		playerFigure.switchState(PlayerFigure.playerStates.Run_Right);
	}



	let isKeyPressed = false;

	for (const [key, value] of Object.entries(pressedKeys)) {
		if (value){
			isKeyPressed = true;
		}
	}

	if(!isKeyPressed){
		switch (eventInformation.key) {
			case "w":
				playerFigure.switchState(PlayerFigure.playerStates.Idle_Front);
				break;
			case "a":
				playerFigure.switchState(PlayerFigure.playerStates.Idle_Left);
				break;
			case "d":
				playerFigure.switchState(PlayerFigure.playerStates.Idle_Right);
				break;
			case "s":
				playerFigure.switchState(PlayerFigure.playerStates.Idle_Bottom);
				break;
	}
	}
}
window.addEventListener("keyup", keyUp);
