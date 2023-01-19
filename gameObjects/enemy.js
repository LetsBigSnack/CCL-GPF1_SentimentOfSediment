class Enemy extends GameObject {

    moveBy = {
        "x": 1,
        "y": 0
    };

    speed = 2;

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        console.log("Enemy has been created");
    }

    update() {
        this.searchPlayer();
        this.position.x += this.moveBy.x * this.speed;
        this.position.y += this.moveBy.y * this.speed;
    }

    searchPlayer(){
        let rng = Math.random();

        if(rng >= 0.5){
            if(this.position.x < skeleton.prevPosition.x){
                this.moveBy.x = 1;
            }else if(this.position.x > skeleton.prevPosition.x){
                this.moveBy.x = -1;
            }else{
                this.moveBy.x = 0;
            }

            if(this.position.y < skeleton.prevPosition.y){
                this.moveBy.y = 1;
            }else if(this.position.y > skeleton.prevPosition.y){
                this.moveBy.y = -1;
            }else{
                this.moveBy.y = 0;
            }
        }else{
            this.moveBy.y *= Math.floor(Math.random() * (1 - -1 + 1) + -1);
            this.moveBy.x *= Math.floor(Math.random() * (1 - -1 + 1) + -1);
        }
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "blue";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
    }

    onCollision(otherObject) {
        if(otherObject.name == "obstacle") {
            this.moveBy.x *= -1;
            this.moveBy.y *= -1;
        }
    }

}