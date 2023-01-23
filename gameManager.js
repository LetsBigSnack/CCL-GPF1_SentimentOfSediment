/**
 * This Class is used to represent the "GameManager".
 * The GameManager handles all the Entities within the game.
 *
 */
class GameManager {


	static states = {
		MainMenu : 0,
		Playing : 1,
		Pausing : 2
	}

	static gameStates = {
		storeAndUpdate : 0,
		collisionCheck : 1,
		applyGravity : 2,
		gravityCollisionCheck : 3,
		gravityRevert : 4,
		mouseEvents :5,
		draw : 6
	};

	static menuStates = {
		update: 0,
		mouseEvents :1,
		draw : 2
	};

	static pauseStates = {
		mouseEvents :0,
		draw : 1
	};
	stopCurrentLoop = false;

	uiElements = [];

	menuElements = [];

	/**
	 * The class constructor for the class "GameManager"
	 */
	constructor() {
		this.framecount = 0;
		this.fps = 60;
		this.fps_time = 1000 / this.fps;
		this.gameObjects = [];
		this.canvas = null;
		this.currentDeltaTime = 0;
		this.previousTimeStamp = 0;
		window.gameManager = this;
		//TODO make MouseHelper static
		window.mouseHelper = new MouseHelper();

		this.rooms = LevelGenerator.generateLevel();
		this.currentRoom = this.rooms.filter(room => room.x_pos === 0 &&  room.y_pos === 0)[0];
		//this.currentRoom.addEntity(new ShootingEnemy("enemy", 300,300,64,64));
		//this.currentRoom.addEntity(new Boulder("enemy", 300,300,128,128));
		/**
		 *
		 *        this.currentRoom.addEntity(new Enemy("enemy", 100,200,64,64));
		 *        this.currentRoom.addEntity(new Enemy("enemy", 400,300,64,64));
		 */
		this.currentRoom.setUpWalls();
		this.currentRoom.visited = true;
		console.log("gameManager created");
		this.startTime = undefined;
		this.framesInRoom = 0;
		this.catchUpFrames = 10;
		this.currentState = GameManager.states.MainMenu;

	}



	/**
	 * This function executes the GameLoop for each object in the gameManger
	 * After it finished the execution it calls itself again
	 */
	gameLoop() {

		/**
		 * The first thing I noticed was that performance.now() is 4 times slower than Date.now() (400k operations vs 100k on my computer).
		 * However, if you want accurate timing/time since page load, using performance.now() is the better option.
		 * It's purely dependent on the time since the code started running, and clock changes do not affect the time.
		 * It's also more accurate: counting tenths of a millisecond instead of milliseconds.
		 *
		 * Link: https://stackoverflow.com/questions/30795525/performance-now-vs-date-now
		 *
		 * Look into that
		 */
		if(!gameManager.startTime){
			//gameManager.addGameObject(new ImageObject("Title", 0,0,gameManager.canvas.canvasBoundaries.right,gameManager.canvas.canvasBoundaries.bottom, "images/Title_Screen.png"));
			gameManager.startTime = performance.now();
		}
		//TODO implement Delta Time
		let currentTimeStamp = performance.now();
		gameManager.currentDeltaTime = currentTimeStamp - gameManager.previousTimeStamp;
		document.querySelector("#fps_time").innerHTML = gameManager.fps_time;
		if(gameManager.currentDeltaTime >= gameManager.fps_time){

			gameManager.previousTimeStamp = currentTimeStamp - (gameManager.currentDeltaTime % gameManager.fps_time);

			document.querySelector("#curTime").innerHTML = gameManager.currentDeltaTime;

			let sinceStart = currentTimeStamp - gameManager.startTime;
			let currentFps = Math.round(1000 / (sinceStart / ++gameManager.framecount) * 100) / 100;
			document.querySelector("#fps").innerHTML = currentFps;
			canvas.clearScreen();
			switch(gameManager.currentState){
				case GameManager.states.MainMenu:
					gameManager.displayMenu();
					break;
				case GameManager.states.Playing:
					gameManager.handleGameLogic();
					break;
				case GameManager.states.Pausing:
					gameManager.pauseGame();
					break;

			}


		}

		requestAnimationFrame(gameManager.gameLoop);
	}

	displayMenu(){
		gameManager.removeGarbage();
		gameManager.currentRoom.removeGarbage();

		for (let gameLoopState = 0; gameLoopState < Object.keys(GameManager.menuStates).length; gameLoopState++) {

			gameManager.menuElements.forEach((menuElement) => {
				if (menuElement.isActive) {
					switch (gameLoopState) {

						case GameManager.menuStates.update:
							if(gameManager.stopCurrentLoop){
								break;
							}
							menuElement.update();
							break;

						case GameManager.menuStates.mouseEvents:
							if(gameManager.stopCurrentLoop){
								break;
							}
							mouseHelper.checkObjectMouseEvent(menuElement);

							break;

						case GameManager.menuStates.draw:
							if(gameManager.stopCurrentLoop){
								break;
							}
							menuElement.draw();
							menuElement.debugDraw();
							break;
					}
				}
			});
			if(gameLoopState === GameManager.menuStates.draw){
				gameManager.stopCurrentLoop = false;
			}
		}
		mouseHelper.recentMouseEvent = 0;
	}

	handleGameLogic(){
		//TODO change -> for of loop
		if(gameManager.framesInRoom < gameManager.catchUpFrames){
			gameManager.framesInRoom++;
		}

		gameManager.removeGarbage();
		gameManager.currentRoom.removeGarbage();

		for (let gameLoopState = 0; gameLoopState < Object.keys(GameManager.gameStates).length; gameLoopState++) {
			//console.log(gameManager.framesInRoom)
			gameManager.gameObjects.forEach((gameObject) => {
				if (gameObject.isActive) {
					switch (gameLoopState) {

						case GameManager.gameStates.storeAndUpdate:
							if(gameManager.stopCurrentLoop){
								break;
							}
							gameObject.storePosition();
							gameObject.update();
							break;

						case GameManager.gameStates.collisionCheck:
							if(gameManager.stopCurrentLoop){
								break;
							}
							gameObject.currentGravityCollisionObject = null;
							gameManager.checkObjectsForCollisions(gameObject);
							break;

						case GameManager.gameStates.applyGravity:
							if(gameManager.stopCurrentLoop){
								break;
							}
							if(gameObject.useGravity){
								GravityHelper.applyGravityForces(gameObject, false);
							}
							break;

						case GameManager.gameStates.gravityCollisionCheck:
							if(gameManager.stopCurrentLoop){
								break;
							}
							gameManager.checkObjectsForGravityCollisions(gameObject);
							break;

						case GameManager.gameStates.gravityRevert:
							if(gameManager.stopCurrentLoop){
								break;
							}
							if (gameObject.useGravity) {
								if (gameObject.currentGravityCollisionObject != null) {
									GravityHelper.applyGravityForces(gameObject, true);
									GravityHelper.applyGameObjectToHitPlatform(gameObject);
								} else {
									gameObject.isFalling = true;
								}
							}
							break;

						case GameManager.gameStates.mouseEvents:
							if(gameManager.stopCurrentLoop){
								break;
							}
							mouseHelper.checkObjectMouseEvent(gameObject);
							mouseHelper.recentMouseEvent = 0;
							break;
						case GameManager.gameStates.draw:
							if(gameManager.stopCurrentLoop){
								break;
							}
							//gameObject.rotate();
							gameObject.draw();
							gameObject.debugDraw();
							//gameObject.restoreCanvas();
							break;
					}
				}
			});
			mouseHelper.recentMouseEvent = 0;
			if(gameLoopState === GameManager.gameStates.draw){
				gameManager.stopCurrentLoop = false;
			}
		}

	}

	/**
	 * Checks if the GameObject collides with another GameObject based on the "Update" function
	 * Checks the collision based on Rectangles
	 * @param{GameObject} object1 The GameObject which the GameLoop is currently on.
	 */
	checkObjectsForCollisions(object1) {
		for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
			if(gameManager.stopCurrentLoop){
				break;
			}
			let object2 = gameManager.gameObjects[i];
			if(object2.isActive) {
				//normal collision after update
				let collisionDetected = this.detectCollision(object1, object2);
				if (collisionDetected) {
					object1.onCollision(object2);
					object2.onCollision(object1);
				}	
			}
		}
	}

	/**
	 * Checks if the GameObject collides with another GameObject based on the "Gravity"
	 * Checks the collision based on Rectangles
	 * @param{GameObject} object1 The GameObject which the GameLoop is currently on.
	 */
	checkObjectsForGravityCollisions(object1) {	
		for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
			if(gameManager.stopCurrentLoop){
				break;
			}
			let object2 = gameManager.gameObjects[i];
			if(object2.isActive && object2.isRigid && object1.useGravity) {
				GravityHelper.checkForGravityCollision(object1, object2);
			}
			if(object2.isActive && object1.isRigid && object2.useGravity) {
				GravityHelper.checkForGravityCollision(object2, object1);
			}
		}
	}

	/**
	 * Checks if two different GameObject are colliding
	 * @param{GameObject} object1 The first GameObject
	 * @param{GameObject} object2 The second GameObject
	 * @returns {boolean} Returns if the 2 Object are colliding
	 */
	detectCollision(object1, object2) {
		//overlap on x-axis
		if(object1.boundaries.getLeftBoundary() <= object2.boundaries.getRightBoundary() &&
			object1.boundaries.getRightBoundary() >= object2.boundaries.getLeftBoundary()) {
					//overlap on y-axis
			if(object1.boundaries.getTopBoundary() <= object2.boundaries.getBottomBoundary() &&
				object1.boundaries.getBottomBoundary() >= object2.boundaries.getTopBoundary()) {
					return true;
			}
		}
	}

	/**
	 * Adds a new GameObject to the GameObject-Array of the gameManager
	 * @param{GameObject} object The Object, which is going to be added
	 */
	addGameObject(object) {
		this.gameObjects.push(object);
		object.gameObjectIndex = this.gameObjects.length - 1;
	}

	clearGameObjects(){
		gameManager.gameObjects = [];
	}

	/**
	 * Sets a Canvas to the gameManger
	 * @param{Canvas} canvas The Canvas, which will be set for the gameManager
	 */
	setCanvas(canvas) {
		this.canvas = canvas;
	}

	setUpRoom(){
		gameManager.clearGameObjects();
		gameManager.currentRoom.addEntity(skeleton);
		gameManager.currentRoom.addEntityToObject(this);
	}

	removeGarbage(){
		let activeGameObjects = gameManager.gameObjects.filter(gameObject => gameObject.isActive);
		for(let i = 0; i < activeGameObjects.length; i++){
			activeGameObjects.gameObjectIndex = i;
		}
		gameManager.gameObjects = activeGameObjects;
	}

	pauseGame() {
		//TODO change -> for of loop
		if(gameManager.framesInRoom < gameManager.catchUpFrames){
			gameManager.framesInRoom++;
		}

		gameManager.removeGarbage();
		gameManager.currentRoom.removeGarbage();

		for (let gameLoopState = 0; gameLoopState < Object.keys(GameManager.pauseStates).length; gameLoopState++) {
			//console.log(gameManager.framesInRoom)
			gameManager.gameObjects.forEach((gameObject) => {
				if (gameObject.isActive) {
					switch (gameLoopState) {

						case GameManager.pauseStates.mouseEvents:
							if(gameManager.stopCurrentLoop){
								break;
							}
							mouseHelper.checkObjectMouseEvent(gameObject);
							break;
						case GameManager.pauseStates.draw:
							if(gameManager.stopCurrentLoop){
								break;
							}
							//gameObject.rotate();
							gameObject.draw();
							gameObject.debugDraw();
							//gameObject.restoreCanvas();
							break;
					}
				}
			});
			mouseHelper.recentMouseEvent = 0;
			if(gameLoopState === GameManager.pauseStates.draw){
				gameManager.stopCurrentLoop = false;
			}

		}
	}

	togglePause(){
		if(gameManager.currentState === GameManager.states.Pausing){
			gameManager.currentState = GameManager.states.Playing;
			gameManager.gameObjects.filter(menu => menu instanceof PauseMenu)[0].disable();
		}else if(gameManager.currentState === GameManager.states.Playing){
			gameManager.currentState = GameManager.states.Pausing;
			new PauseMenu("",gameManager.canvas.canvasBoundaries.right/2-150, gameManager.canvas.canvasBoundaries.bottom/2-200, 300,400, "images/menu_story.png");

		}
	}
}
	
