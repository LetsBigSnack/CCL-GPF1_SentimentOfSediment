class YummyDot extends GameObject{

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "#0000ff";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.closePath();   
    }

    onCollision(otherObject) {
        if(otherObject.name == "player") {
            this.isActive = false;
        }
    }
}