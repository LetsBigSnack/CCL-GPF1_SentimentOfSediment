let pressedKeys = {}

function keyDown(eventInformation) {

	pressedKeys[eventInformation.key] = true;

	switch (eventInformation.key) {
		case "w":
			skeleton.moveBy.top = -skeleton.moveVelocity;
			skeleton.switchState(PlayerFigure.playerStates.Run_Front);
			break;
		case "a":
			skeleton.moveBy.left = -skeleton.moveVelocity;
			skeleton.switchState(PlayerFigure.playerStates.Run_Left);

			break;
		case "d":
			skeleton.moveBy.left = skeleton.moveVelocity;
			skeleton.switchState(PlayerFigure.playerStates.Run_Right);

			break;
		case "s":
			skeleton.moveBy.top = skeleton.moveVelocity;
			skeleton.switchState(PlayerFigure.playerStates.Run_Bottom);

			//move down
			break;
		case "ArrowLeft":
			// Left pressed
			console.log("PlayerPunch Left");
			skeleton.switchState(PlayerFigure.playerStates.Punch_Left);
			skeleton.punch = "left";
			break;
		case "ArrowRight":
			// Right pressed
			console.log("PlayerPunch Right");
			skeleton.switchState(PlayerFigure.playerStates.Punch_Right);
			skeleton.punch = "right";
			break;
		case "ArrowUp":
			// Up pressed
			console.log("PlayerPunch Up");
			skeleton.switchState(PlayerFigure.playerStates.Punch_Bottom);
			skeleton.punch = "up";
			break;
		case "ArrowDown":
			// Down pressed
			console.log("PlayerPunch Down");
			skeleton.switchState(PlayerFigure.playerStates.Punch_Front);
			skeleton.punch = "down";
			break;
		case "e":

			skeleton.bomb = true;
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

	skeleton.moveBy.top = 0;
	skeleton.moveBy.left = 0;

	if(pressedKeys["w"]){
		skeleton.moveBy.top = -skeleton.moveVelocity;
		skeleton.switchState(PlayerFigure.playerStates.Run_Front);
	}
	if(pressedKeys["a"]){
		skeleton.moveBy.left = -skeleton.moveVelocity;
		skeleton.switchState(PlayerFigure.playerStates.Run_Left);
	}
	if(pressedKeys["s"]){
		skeleton.moveBy.top = skeleton.moveVelocity;
		skeleton.switchState(PlayerFigure.playerStates.Run_Bottom);
	}
	if(pressedKeys["d"]){
		skeleton.moveBy.left = skeleton.moveVelocity;
		skeleton.switchState(PlayerFigure.playerStates.Run_Right);
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
				skeleton.switchState(PlayerFigure.playerStates.Idle_Front);
				break;
			case "a":
				skeleton.switchState(PlayerFigure.playerStates.Idle_Left);
				break;
			case "d":
				skeleton.switchState(PlayerFigure.playerStates.Idle_Right);
				break;
			case "s":
				skeleton.switchState(PlayerFigure.playerStates.Idle_Bottom);
				break;
	}
	}
}
window.addEventListener("keyup", keyUp);
