
class Punch extends GameObject {


    constructor(name, x, y, width, height, offSetX, offSetY) {
        super(name, x, y, width, height);
        this.offSetX = offSetX;
        this.offSetY = offSetY;

    }

    update() {
        this.position.x = skeleton.position.x + this.offSetX;
        this.position.y = skeleton.position.y + this.offSetY;
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "purple";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
    }

    onCollision(otherObject) {

    }

}