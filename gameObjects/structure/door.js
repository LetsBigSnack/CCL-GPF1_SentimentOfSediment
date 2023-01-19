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
                gameManager.currentRoom.visited = true;
                switch (this.name){
                    case "n":
                        skeleton.position.y = 444-64;
                        break;
                    case "e":
                        skeleton.position.x = 70;
                        break;
                    case "s":
                        skeleton.position.y = 70;
                        break;
                    case "w":
                        console.log("dsad");
                        skeleton.position.x = 640;
                        break;
                }

                if(!gameManager.currentRoom.alreadyFilled){
                    gameManager.currentRoom.setUpWalls();
                    gameManager.currentRoom.addEntity(skeleton);
                    gameManager.currentRoom.addEntity(miniMap);
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