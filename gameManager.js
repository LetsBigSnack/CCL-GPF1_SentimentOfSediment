/**
 * This Class is used to represent the "GameManager".
 * The GameManager handles all the Entities within the game.
 *
 */
class GameManager {

	static gameStates = {
		storeAndUpdate : 0,
		collisionCheck : 1,
		applyGravity : 2,
		gravityCollisionCheck : 3,
		gravityRevert : 4,
		mouseEvents :5,
		draw : 6
	};
	stopCurrentLoop = false;

	/**
	 * The class constructor for the class "GameManager"
	 */
	constructor() {

		this.gameObjects = [];
		this.canvas = null;
		this.currentDeltaTime = 0;
		this.previousTimeStamp = 0;
		window.gameManager = this;
		//TODO make MouseHelper static
		window.mouseHelper = new MouseHelper();

		this.currentRoom = new Room();
		let test = new Room();
		test.addEntity(enemy);
		this.currentRoom.addConnection(Room.connections.North, test);
		this.currentRoom.setUpWalls();

		this.rooms = [];

		console.log("gameManager created");
	}

	/**
	 * This function executes the GameLoop for each object in the gameManger
	 * After it finished the execution it calls itself again
	 */
	gameLoop() {

		//TODO implement Delta Time
		let currentTimeStamp = performance.now();
		gameManager.currentDeltaTime = currentTimeStamp - gameManager.previousTimeStamp;
		gameManager.previousTimeStamp = currentTimeStamp;

		canvas.clearScreen();
		//TODO change -> for of loop
		for (let gameLoopState = 0; gameLoopState < Object.keys(GameManager.gameStates).length; gameLoopState++) {

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
							break;
						case GameManager.gameStates.draw:
							if(gameManager.stopCurrentLoop){
								break;
							}
							//gameObject.rotate();
							gameObject.draw();
							//gameObject.restoreCanvas();
							break;
					}
				}
			});

			if(gameLoopState === GameManager.gameStates.draw){
				gameManager.stopCurrentLoop = false;
			}
		}
		mouseHelper.recentMouseEvent = 0;	
		requestAnimationFrame(gameManager.gameLoop);
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
}
	
