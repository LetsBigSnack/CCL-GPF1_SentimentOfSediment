let pressedKeys = {}

function keyDown(eventInformation) {

	pressedKeys[eventInformation.key] = true;

	switch (eventInformation.key) {
		case "w":
			skeleton.moveBy.top = -skeleton.moveVelocity;
			skeleton.setCurrentAnimationByName("walk_up");
			break;
		case "a":
			skeleton.moveBy.left = -skeleton.moveVelocity;
			skeleton.setCurrentAnimationByName("walk_left");
			break;
		case "d":
			skeleton.moveBy.left = skeleton.moveVelocity;
			skeleton.setCurrentAnimationByName("walk_right");
			break;
		case "s":
			skeleton.moveBy.top = skeleton.moveVelocity;
			skeleton.setCurrentAnimationByName("walk_down");
			//move down
			break;
		case "ArrowLeft":
			// Left pressed
			console.log("Punch Left");
			skeleton.punch = "left";
			break;
		case "ArrowRight":
			// Right pressed
			console.log("Punch Right");
			skeleton.punch = "right";
			break;
		case "ArrowUp":
			// Up pressed
			console.log("Punch Up");
			skeleton.punch = "up";
			break;
		case "ArrowDown":
			// Down pressed
			console.log("Punch Down");
			skeleton.punch = "down";
			break;
		case "e":
			// Down pressed
			console.log("Punch Down");
			skeleton.bomb = true;
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
		skeleton.setCurrentAnimationByName("walk_up");
	}
	if(pressedKeys["a"]){
		skeleton.moveBy.left = -skeleton.moveVelocity;
		skeleton.setCurrentAnimationByName("walk_left");
	}
	if(pressedKeys["s"]){
		skeleton.moveBy.top = skeleton.moveVelocity;
		skeleton.setCurrentAnimationByName("walk_down");
	}
	if(pressedKeys["d"]){
		skeleton.moveBy.left = skeleton.moveVelocity;
		skeleton.setCurrentAnimationByName("walk_right");
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
                skeleton.setCurrentAnimationByName("idle_up");
				break;
			case "a":
				skeleton.setCurrentAnimationByName("idle_left");
				break;
			case "d":
				skeleton.setCurrentAnimationByName("idle_right");
				break;
			case "s":
                skeleton.setCurrentAnimationByName("idle_down");
				break;
	}

	}
}
window.addEventListener("keyup", keyUp);
