class Enemy extends ImageObject {

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

    canPlaySound = true;


    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height,src);
        console.log("Enemy has been created");
        this.mass = 5;
    }

    update() {
        if(gameManager.framesInRoom >= gameManager.catchUpFrames){
            if(this.health <= 0){
                if(gameManager.playSound){
                   let deathSound = new Audio("Sounds/Hit Rock Debris_RBD 02.wav");
                    deathSound.volume = 0.2;
                    deathSound.play();
                    console.log("ddassdada");
                }
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


    onCollision(otherObject) {
        if(otherObject.name instanceof Obstacle) {
            this.moveBy.y = 0;
            this.moveBy.x = 0;
            this.restorePosition();

        }
        if(otherObject.name == "player" || otherObject.name == "enemy"){
            this.restorePosition();
            if(otherObject.name == "enemy" && this.knockback){
                otherObject.knockbackDirection = this.knockbackDirection;
                otherObject.knockback = true;
            }
        }
        if(otherObject.name == "punch") {

            if(gameManager.playSound && this.canPlaySound){

                let rng = Math.random();
                let punchSound
                if(rng < 0.5){
                     punchSound = new Audio("Sounds/boulder_impact_on_stones_14.wav");

                }else{
                     punchSound = new Audio("Sounds/punch_heavy_huge_distorted_01.wav");
                }

                punchSound.volume = 0.2;
                punchSound.play();

                this.canPlaySound = false;
                setTimeout(() => {this.canPlaySound =true;},1000);

            }

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
                        this.moveBy.y +=  10/this.mass;
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
            new BombItem("bombItem", this.position.x-8, this.position.y-8, 32, 32),
            new HealItem("healItem", this.position.x-8, this.position.y-8, 32, 32),
        ]

        for(let i = 0; i < skeleton.luck; i++){
            let rng = Math.random();
            if(rng > 0.4){
                let item = rngItems[Math.floor(Math.random()*rngItems.length)];
                //TODO implement add Entity --> addGameObject
                gameManager.currentRoom.addEntity(item);
                gameManager.addGameObject(item);
                return;
            }
        }
    }



}