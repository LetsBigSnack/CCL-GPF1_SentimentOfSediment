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

                switch (this.name){
                    case "n":
                        skeleton.position.x = 352;
                        skeleton.position.y = 444-64;
                        break;
                    case "e":
                        skeleton.position.x = 70;
                        skeleton.position.y = 224;
                        break;
                    case "s":
                        skeleton.position.x = 352;
                        skeleton.position.y = 70;
                        break;
                    case "w":
                        console.log("dsad");
                        skeleton.position.x = 640;
                        skeleton.position.y = 224;
                        break;
                }

                if(!gameManager.currentRoom.alreadyFilled){
                    gameManager.currentRoom.setUpWalls();
                    gameManager.currentRoom.addEntity(skeleton);
                }
                gameManager.currentRoom.addEntityToObject(gameManager);
                gameManager.stopCurrentLoop = true;
            }
        }
    }

    doorClose(){

    }

    doorOpen(){

    }
}