class Door extends Obstacle {

    opend = false;

    constructor(name, x, y, width, height,src, srcClosed) {
        super(name, x, y, width, height, src);
        this.isRigid = true;
        this.imageClosed = new Image();
        this.imageClosed.src = srcClosed;
        this.imageClosed.addEventListener("load", () => {
            this.isLoaded = true;
        });

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
            gameManager.canvas.drawLayer.drawImage(this.image, this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);

        }else{
            gameManager.canvas.drawLayer.drawImage(this.imageClosed, this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);

        }
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
                            playerFigure.position.y = 444-64;
                            break;
                        case "e":
                            playerFigure.position.x = 70;
                            break;
                        case "s":
                            playerFigure.position.y = 70;
                            break;
                        case "w":
                            console.log("dsad");
                            playerFigure.position.x = 640;
                            break;
                    }

                    if(!gameManager.currentRoom.alreadyFilled){
                        gameManager.currentRoom.setUpWalls();
                        gameManager.currentRoom.addEntity(playerFigure);
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