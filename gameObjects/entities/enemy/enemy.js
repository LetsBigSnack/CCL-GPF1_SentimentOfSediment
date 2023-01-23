class Enemy extends GameObject {

    moveBy = {
        "x": 1,
        "y": 0
    };

    speed = 2;
    health = 1000;
    damage = 10;

    knockback = false;
    knockbackDirection = "";
    knockbackCurrentFrame = 0;
    knockbackFrameCountdown = 3;
    knocbackCooldown = true;


    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        console.log("Enemy has been created");
        this.mass = 2;
    }

    update() {
        if(gameManager.framesInRoom >= gameManager.catchUpFrames){
            if(this.health <= 0){

                this.isActive = false;
                this.spawnItem();
            }
            if(this.knockback){
                this.moveBy.x = 0;
                this.moveBy.y = 0;
                this.knockBack();
            }else{
                this.searchPlayer();
            }
            this.position.x += this.moveBy.x * this.speed;
            this.position.y += this.moveBy.y * this.speed;
        }
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
        console.log("sadas");
        if(otherObject.name == "obstacle") {
            this.moveBy.x *= -1;
            this.moveBy.y *= -1;

        }
        if(otherObject.name == "player" || otherObject.name == "enemy"){
            this.restorePosition();
            if(otherObject.name == "enemy" && this.knockback){
                otherObject.knockbackDirection = this.knockbackDirection;
                otherObject.knockback = true;
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
                        this.moveBy.x -= 10/this.mass;
                        break;
                    case "right":
                        this.moveBy.x  +=  10/this.mass;
                        break;
                    case "up":
                        this.moveBy.y  -=  10/this.mass;
                        break;
                    case "down":
                        this.moveBy.y +=  10;
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

    spawnItem(){

        let rngItems = [
            new BombItem("bombItem", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height),
            new HealItem("healItem", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height),
        ]

        for(let i = 0; i < skeleton.luck; i++){
            let rng = Math.random();
            if(rng < 0.15){
                let item = rngItems[Math.floor(Math.random()*rngItems.length)];
                //TODO implement add Entity --> addGameObject
                gameManager.currentRoom.addEntity(item);
                gameManager.addGameObject(item);
                return;
            }
        }
    }



}