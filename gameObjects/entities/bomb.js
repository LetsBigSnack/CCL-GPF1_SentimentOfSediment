
class Bomb extends GameObject {


    moveBy = {
        "x": 0,
        "y": 0
    };
    frameUntilExplode = 120;
    currentFrameCount = 0;
    explode = false;
    bombDamage = 300;

    //Code Double in Enemy, will fix Later
    knockback = false;
    knockbackDirection = "";
    knockbackCurrentFrame = 0;
    knockbackFrameCountdown = 20;
    knocbackCooldown = true;

    bounce = false;
    bounceFrames = 0;
    bouncesMaxFrames = 10;

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);

    }

    update() {

        this.currentFrameCount++;

        if(!this.bounce){
            this.moveBy.x = 0;
            this.moveBy.y = 0;
        }else{
            this.bounceFrames++;
            if(this.bounceFrames >= this.bouncesMaxFrames){
                this.bounce = false;
                this.bounceFrames = 0;
            }

        }
        if(this.knockback) {
            this.knockBack();
        }else{

        }


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
        console.log(this.moveBy.x, this.moveBy.y);
        this.position.x += this.moveBy.x;
        this.position.y += this.moveBy.y;


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

        }else if(this.currentFrameCount % 15 === 0){
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
        }else{

            if(otherObject instanceof  Obstacle) {
                this.restorePosition();
                this.bounce = true;
                this.knockback = false;
                this.knockbackCurrentFrame = 0;
                this.bounceFrames = 0;
                this.moveBy.x *= -1;
                this.moveBy.y *= -1;
            }
            if(otherObject.name == "enemy") {
                this.restorePosition();
                if(this.knockback){
                    otherObject.knockbackDirection = this.knockbackDirection;
                    otherObject.knockback = true;
                }
            }
        }

        if(otherObject.name == "punch") {
            this.health -= skeleton.punchDamage;
            this.knockbackDirection = otherObject.direction;
            this.knockback = true;
        }

    }


    knockBack(){
        if(this.knockbackCurrentFrame <= this.knockbackFrameCountdown && this.knocbackCooldown){
            switch(this.knockbackDirection){
                case "left":
                    this.moveBy.x -= 5/this.mass;
                    break;
                case "right":
                    this.moveBy.x  +=  5/this.mass;
                    break;
                case "up":
                    this.moveBy.y  -=  5/this.mass;
                    break;
                case "down":
                    this.moveBy.y +=  5/this.mass;
                    break;
            }
            this.knockbackCurrentFrame++;

        }else{
            this.knockback = false;
            this.knockbackCurrentFrame = 0;
            this.knocbackCooldown = false;
            setTimeout(() => {
                this.knocbackCooldown = true;
            }, 100);
        }
    }

}