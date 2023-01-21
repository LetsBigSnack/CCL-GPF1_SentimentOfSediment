class Door extends Obstacle {

    opend = false;
    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.isRigid = true;

    }

    update() {
         if(!this.opend && gameManager.currentRoom.containedEntites.filter(value => value.name === "enemy" && value.isActive).length <= 0){
            this.opend = true;
        }

        if(this.opend) {
            switch (this.name) {
                case "n":
                    this.setBoundaryOffsets(0, 0, 0, -55);
                    break;
                case "e":
                    this.setBoundaryOffsets(55, 0, 0, 0);
                    break;
                case "s":
                    this.setBoundaryOffsets(0, 0, 55, 0);
                    break;
                case "w":
                    this.setBoundaryOffsets(0, -55, 0, 0);
                    break;
            }
        }
    }

    draw() {
        this.setBoundaryOffsets(0,0,0,0);
        gameManager.canvas.drawLayer.beginPath();
        if(this.opend){
            gameManager.canvas.drawLayer.fillStyle = "yellow";
        }else{
            gameManager.canvas.drawLayer.fillStyle = "orange";
        }
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {
            if(this.opend){
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
                        gameManager.currentRoom.addEntity(playerUI);
                        gameManager.currentRoom.addEntity(playerStats);
                    }
                    gameManager.framesInRoom = 0;
                    gameManager.currentRoom.addEntityToObject(gameManager);
                    gameManager.stopCurrentLoop = true;
                }
            }else{
                console.log("Rigid");
                otherObject.restorePosition();
            }
        }
    }

    doorClose(){

    }

    doorOpen(){

    }
}