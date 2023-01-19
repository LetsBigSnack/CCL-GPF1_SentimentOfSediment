/**
 * This Class is the baseClass for all other GameObject which are used in the Game
 * The GameObject stores all necessary, which are need to represent a GameObject
 * On Creation it adds itself to the GameManager GameObjects-Array
 */
class GameObject {

    gameObjectIndex = undefined;
	name = "";
    isActive = true;
    useGravity = false;
    isFalling = false;
    isRigid = false;
    antiGravityForce = 0;
    currentGravityCollisionObject = null;
    mass = 1;
    //rotation = 0;


    boundaries = {
        "getLeftBoundary": () => {
            return this.position.x + this.boundaryOffsets.left;
        }, 
        "getRightBoundary": () => {
            return this.position.x + this.dimensions.width + this.boundaryOffsets.right;
        }, 
        "getTopBoundary": () => {
            return this.position.y + this.boundaryOffsets.top;
        }, 
        "getBottomBoundary": () => {
            return this.position.y + this.dimensions.height + this.boundaryOffsets.bottom;
        }
    };

    boundaryOffsets = {
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0 
    }

    /**
     * The class constructor for the class "GameObject"
     * @param{string} name The name of the GameObject
     * @param{number} x The initial position on the X-axis
     * @param{number} y The initial position on the Y-axis
     * @param{number} width The width of the GameObject
     * @param{number} height the height of the GameObject
     */
    constructor(name, x, y, width, height) {
        this.name = name;

        this.position = {
            x: x,
            y: y
        };

        this.prevPosition = {
            x: x,
            y: y
        };

        this.dimensions = {
            width : width,
            height : height
        };
        //gameManager.addGameObject(this);
        console.log("new GameObject has been created");
    }

    /**
     * Stores the current position of the GameObject
     */
    storePosition() {
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }

    /**
     * Restores the position of the GameObject based on the stored position
     */
    restorePosition() {
        this.position.x = this.prevPosition.x;
        this.position.y = this.prevPosition.y;
    }

    /**
     * Sets inner boundaries for the GameObject
     * This boundary is later used for collision detection
     * @param{number} left The offset on the left side
     * @param{number} right The offset on the right side
     * @param{number} top The offset on the top side
     * @param{number} bottom The offset on the bottom side
     */
    setBoundaryOffsets(left, right, top, bottom) {
        this.boundaryOffsets.left = left;
        this.boundaryOffsets.right = right;
        this.boundaryOffsets.top = top;
        this.boundaryOffsets.bottom = bottom;
    }

    /**
     * Adds a antiGravityForce to the GameObject
     * @param{number} force The force, which is added to the antiGravityForce
     */
    addAntiGravityForce(force) {
        this.antiGravityForce += force;
    }

    /**
     * This function will be called every frame.
     * It handles the logic of the GameObject
     */
    update() {

    }

    /**
     * This function will be called every frame.
     * It draws the GameObject to the canvas
     */
    draw() {
    }

    debugDraw(){
        //
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.strokeStyle = "red";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();

        //Offset
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.strokeStyle = "blue";
        gameManager.canvas.drawLayer.rect(  this.boundaryOffsets.left+ this.position.x, this.position.y + this.boundaryOffsets.top, this.dimensions.width+this.boundaryOffsets.right-this.boundaryOffsets.left, this.dimensions.height+this.boundaryOffsets.bottom-this.boundaryOffsets.top);
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
    }

    /**
     * This function is called whenever another GameObject collides with this one
     * and executes what happens afterward
     * @param{GameObject} otherObject The GameObject that is being collided with
     */
    onCollision(otherObject) {
     
    }

    /**
     * This Function is called whenever a mouseEvent interacts with the object
     * @param{MouseHelper.mouseEventCodes} mouseEvent
     */
    onMouseEvent(mouseEvent) { 
        /*
            recentMouseEvent: 
            0 == hover, 
            1 == left down initial, 2 == middle down initial, 3 == right down initial, 
            4 == left down held, 5 == middle up held, 6 == right up held, 
            7 == left up, 8 == middle up, 9 == right up, 
            10 == left click, 11 == middle click, 12 == right click,
            13 == focus lost
        */
    }


}