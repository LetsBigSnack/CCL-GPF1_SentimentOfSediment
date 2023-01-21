
class Bomb extends GameObject {

    frameUntilExplode = 120;
    currentFrameCount = 0;
    explode = false;
    bombDamage = 300;

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);

    }

    update() {
        this.currentFrameCount++;
        if(this.currentFrameCount === this.frameUntilExplode){
            this.dimensions.width *= 3;
            this.dimensions.height *= 3;

            this.position.x -= this.dimensions.width/4;
            this.position.y -= this.dimensions.height/4;

            this.explode = true;
            setTimeout(() => {
                this.isActive = false;
            }, "200")
        }

        console.log(this.explode);

    }


    draw() {

        if(this.explode){
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.fillStyle = "orange";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();

        }else if(this.currentFrameCount % 10 === 0){
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.fillStyle = "white";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }else{
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.fillStyle = "red";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }

    }

    onCollision(otherObject) {
        if(this.explode){
            if(otherObject.name == "player" || otherObject.name == "enemy") {
                otherObject.health -= this.bombDamage;
            }
        }

    }

}