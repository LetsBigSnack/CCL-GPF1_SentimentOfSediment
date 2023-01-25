class Bullet extends Enemy {

    moveBy = {
        "x": 1,
        "y": 0
    };

    speed = 5;
    damage = 10;


    constructor(name, x, y, width, height, moveByX, moveByY) {
        super(name, x, y, width, height);
        this.mass = 2;
        this.moveBy.x = moveByX;
        this.moveBy.y = moveByY;
    }

    update() {
        this.position.x += this.moveBy.x * this.speed;
        this.position.y += this.moveBy.y * this.speed;
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
        if(otherObject.name == "player" || otherObject instanceof Obstacle) {
            this.isActive = false;

        }


    }

}