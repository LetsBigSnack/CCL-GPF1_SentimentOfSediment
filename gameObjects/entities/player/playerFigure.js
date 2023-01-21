
class PlayerFigure extends ImageObject {


    moveBy = {
	    "left": 0,
	    "top": 0
    };

    moveVelocity = 3;

    maxHealth = 100;
    health = 100;

    luck = 1;

    bomb = false;
    bombNumber = 1;
    bombCooldown = true;
    bombCooldownTimer = 400;

    punch = "";
    punchCooldown = true;
    punchCooldownTimer = 1000;
    punchDamage = 50;
    punchDuration = 200;

    invincible = false;
    invincibleFrame = 0;
    invincibilityFramesCooldown = 30;

    punchCooldownMax = 300;
    moveVelocityMax = 5;

    maxInvincibilityFrameCooldown = 60;


    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        console.log("PlayerFigure has been created");

        this.mass = .6;
    }

    update() {
        if(this.health <= 0){
            this.health = 0;
            this.isActive = false;
        }
        this.checkInvicibility();
        this.position.x += this.moveBy.left;
        this.position.y += this.moveBy.top;
        if(this.punch){
            this.spawnPunch(this.punch);
        }
        if(this.bomb){
            this.spawnBomb();

        }
        this.checkWorldPostion();
    }
    
    checkWorldPostion() {
        if (this.boundaries.getBottomBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = gameManager.canvas.canvasBoundaries.bottom;
        }
        else if (this.boundaries.getTopBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            this.position.y = gameManager.canvas.canvasBoundaries.top - this.dimensions.height;
        }
        else if (this.boundaries.getRightBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.position.x = gameManager.canvas.canvasBoundaries.right;
        }
        else if (this.boundaries.getLeftBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.position.x = gameManager.canvas.canvasBoundaries.left - this.dimensions.width;
        }
    }

    checkInvicibility(){
        if(this.invincibleFrame >= this.invincibilityFramesCooldown){
            this.invincible = false;
            this.invincibleFrame = 0;
        }else{
            this.invincibleFrame++;
        }
    }

    //TODO write CLEAN delete Object afterwards
    //TODO take offset into consideration
    //TODO add Attributes to the PlayerPunch
    spawnPunch(punch){
        if(this.punchCooldown){
            this.punchCooldown = false;
            let punchObject
            switch (punch){
                case "left":
                    punchObject = new PlayerPunch("punch", this.position.x-32, this.position.y,64,64, -64, 0, "left");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    }, this.punchDuration)

                    break;
                case "right":
                    punchObject = new PlayerPunch("punch", this.position.x+this.dimensions.width-32, this.position.y,64,64, this.dimensions.width, 0, "right");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    },  this.punchDuration)

                    break;
                case "up":
                    punchObject = new PlayerPunch("punch", this.position.x, this.position.y-this.dimensions.height+32,64,64, 0, -this.dimensions.height, "up");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    },  this.punchDuration)
                    break;

                case "down":
                    punchObject = new PlayerPunch("punch", this.position.x, this.position.y+this.dimensions.height-32,64,64, 0, +this.dimensions.height, "down");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    },  this.punchDuration)
                    break;

                    break;
            }
            setTimeout(() => {
                this.punchCooldown = true;
            }, this.punchCooldownTimer);
        }
        this.punch = "";
    }

    draw() {
        super.draw();
        if(this.invincible){
            if(this.invincibleFrame % 2 === 0){
                gameManager.canvas.drawLayer.beginPath();
                gameManager.canvas.drawLayer.fillStyle = "white";
                gameManager.canvas.drawLayer.strokeStyle = "#000000";
                gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                gameManager.canvas.drawLayer.fill();
                gameManager.canvas.drawLayer.stroke();
                gameManager.canvas.drawLayer.closePath();
            }else {
                gameManager.canvas.drawLayer.beginPath();
                gameManager.canvas.drawLayer.fillStyle = "red";
                gameManager.canvas.drawLayer.strokeStyle = "#000000";
                gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                gameManager.canvas.drawLayer.fill();
                gameManager.canvas.drawLayer.stroke();
                gameManager.canvas.drawLayer.closePath();
            }
        }
    }

    spawnBomb(){
        console.log(this.bombCooldown);
        if(this.bombCooldown && this.bombNumber > 0){

            this.bombCooldown = false;
            let bomb = new Bomb("bomb", this.position.x, this.position.y,64,64);
            gameManager.currentRoom.addEntity(bomb);
            gameManager.addGameObject(bomb);
            this.bombNumber--;
            setTimeout(() => {
                this.bombCooldown = true;
            }, this.bombCooldownTimer);

        }
        this.bomb = false;
    }

    onCollision(otherObject) {
        if(otherObject.name == "enemy" || otherObject.name == "bullet" ){
            if(!this.invincible){
                this.health -= otherObject.damage;
                this.invincible = true;
            }
        }
    }

    heal(number){
        this.health += number;
        if(this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
    }

    addHealth(number){
        this.maxHealth += number;
        this.health = this.maxHealth;
    }

    subPunchCooldown(number){
        if(this.punchCooldownTimer - number >= this.punchCooldownMax){
            this.punchCooldownTimer -= number;
        }else{
            this.punchCooldownTimer = this.punchCooldownMax;
        }
    }

    addMoveVelocity(number){

        if(this.moveVelocity + number <= this.moveVelocityMax){
            this.moveVelocity += number;
        }else{
            this.moveVelocity =  this.moveVelocityMax;
        }
    }

    addLuck(number){
        this.luck += number;
    }

    addPunchDamage(number){
        this.punchDamage += number;
    }

    addInvincibilityCooldown(number){
        if(this.invincibilityFramesCooldown + number <= this.maxInvincibilityFrameCooldown){
            this.invincibilityFramesCooldown += number;
        }else {
            this.invincibilityFramesCooldown =  this.maxInvincibilityFrameCooldown;
        }
    }

}