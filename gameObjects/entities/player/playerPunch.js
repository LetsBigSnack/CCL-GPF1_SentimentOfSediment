
class PlayerPunch extends ImageObject {


    constructor(name, x, y, width, height, offSetX, offSetY, direction,src) {
        super(name, x, y, width, height, src);
        this.offSetX = offSetX;
        this.offSetY = offSetY;
        this.direction = direction;
        if(gameManager.playSound){
            let punchSound = new Audio("Sounds/IMPACT_LOW_THUD_10.wav");
            punchSound.volume = 0.2;
            punchSound.play();
        }
    }

    update() {
        this.position.x = playerFigure.position.x + this.offSetX;
        this.position.y = playerFigure.position.y + this.offSetY;
        this.position.x = Math.round(this.position.x);
        this.position.y = Math.round(this.position.y);
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.drawImage(this.image,this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.closePath();
    }

    onCollision(otherObject) {

    }

}