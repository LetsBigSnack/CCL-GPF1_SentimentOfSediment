class Door extends GameObject {
    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.isRigid = false;
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "yellow";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {
            if(gameManager.currentRoom.connectedRooms[this.name]){
                gameManager.currentRoom = gameManager.currentRoom.connectedRooms[this.name];
                gameManager.clearGameObjects();
                skeleton.position.x = 300;
                skeleton.position.y = 300;
                if(!gameManager.currentRoom.alreadyFilled){
                    gameManager.currentRoom.setUpWalls();
                    gameManager.currentRoom.addEntity(skeleton);
                }
                gameManager.currentRoom.addEntityToObject(gameManager);
                gameManager.stopCurrentLoop = true;
            }

            console.log("Yippy");
            console.log(gameManager.gameObjects);
            console.log(skeleton.moveBy.left);
            console.log(skeleton.moveBy.top);
        }
    }

    doorClose(){

    }

    doorOpen(){

    }
}