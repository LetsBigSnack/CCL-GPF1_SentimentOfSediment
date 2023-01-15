function keyDown(eventInformation) {

	switch (eventInformation.key) {
		case "w":
			if (skeleton.isFalling || skeleton.antiGravityForce > 0)
				return;
			
			skeleton.startJump = true;
			break;
		case "a":
			if (skeleton.moveBy.left != 0 || skeleton.moveBy.top != 0) {
				return;
			}
			skeleton.moveBy.top = 0;
			skeleton.moveBy.left = -skeleton.moveVelocity;
			//skeleton.setCurrentAnimation(9, 17);
			skeleton.setCurrentAnimationByName("walk_left");
			//move left
			break;
		case "d":
			if (skeleton.moveBy.left != 0 || skeleton.moveBy.top != 0) {
				return;
			}
			skeleton.moveBy.top = 0 ;
			skeleton.moveBy.left = skeleton.moveVelocity;
			//skeleton.setCurrentAnimation(27, 35);
			skeleton.setCurrentAnimationByName("walk_right");
			//move right
			break;
		case "s":
			if (skeleton.moveBy.left != 0 || skeleton.moveBy.top != 0) {
				return;
			}
			skeleton.moveBy.top = skeleton.moveVelocity;
			skeleton.moveBy.left = 0;
			//skeleton.setCurrentAnimation(18, 26);
			skeleton.setCurrentAnimationByName("walk_down");
			//move down
			break;
	}
}
window.addEventListener("keydown", keyDown);

function keyUp(eventInformation) {
	switch (eventInformation.key) {
		case "w":
		    /*skeleton.moveBy.top = 0;
			skeleton.moveBy.left = 0;
			//skeleton.setCurrentAnimation(0, 0);
			skeleton.setCurrentAnimationByName("idle_up");*/
			//move up
			break;
		case "a":
			skeleton.moveBy.top = 0;
			skeleton.moveBy.left = 0;
			//skeleton.setCurrentAnimation(9, 9);
			skeleton.setCurrentAnimationByName("idle_left");
			//move left
			break;
		case "d":
			skeleton.moveBy.top = 0 ;
			skeleton.moveBy.left = 0;
			//skeleton.setCurrentAnimation(27, 35);
			skeleton.setCurrentAnimationByName("idle_right");
			//move right
			break;
		case "s":
			/*skeleton.moveBy.top = 0;
			skeleton.moveBy.left = 0;
			//skeleton.setCurrentAnimation(18, 26);
			skeleton.setCurrentAnimationByName("idle_down");
			//move down*/
			break;
	}
}
window.addEventListener("keyup", keyUp);
