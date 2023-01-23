class Boulder extends GameObject {

    moveBy = {
        "x": 0,
        "y": 0
    };

    speed = 4.5;
    health = 10000;
    damage = 10;


    static boulderState = {
        Idle: 0,
        Slamming: 1,
        Bouncing: 2
    };
    state = Boulder.boulderState.Idle;

    framesToStateSwitch = 100;
    currentStateFrame  = 0;


    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        console.log("Enemy has been created");
        this.mass = 100;
    }

    update() {
        if(gameManager.framesInRoom >= gameManager.catchUpFrames){
            if(this.health <= 0){

                this.isActive = false;
                //this.spawnItem();
            }

            console.log(this.state);
            if (this.currentStateFrame >= this.framesToStateSwitch){
                this.currentStateFrame = 0;
                this.state = Boulder.boulderState.Idle;
            }
            this.currentStateFrame++;
                switch (this.state){
                    case Boulder.boulderState.Idle:

                        this.changeState();
                        break;
                    case Boulder.boulderState.Slamming:

                        this.slam();
                        break;
                    case Boulder.boulderState.Bouncing:

                        this.bounce();
                        break;
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


        if(otherObject instanceof Obstacle) {
            this.restorePosition();
            switch (this.state){
                case Boulder.boulderState.Slamming:
                    this.moveBy.x = 0;
                    this.moveBy.y = 0;
                    break;
                case Boulder.boulderState.Bouncing:
                    switch (otherObject.placement){
                        case "top":
                            this.moveBy.y *= -1;
                            break;
                        case "bottom":
                            this.moveBy.y *= -1;
                            break;
                        case "left":
                            this.moveBy.x *= -1;
                            break;
                        case "right":
                            this.moveBy.x *= -1;
                            break;
                    }
            }
        }
        if(otherObject.name == "player" || otherObject.name == "enemy"){
            this.restorePosition();
            if(otherObject.name == "player"){
                switch (this.state){
                    case Boulder.boulderState.Slamming:
                        this.moveBy.x = 0;
                        this.moveBy.y = 0;
                        break;
                    case Boulder.boulderState.Bouncing:
                        this.moveBy.x *= -1;
                        this.moveBy.y *= -1;
                        break;
                }
            }
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


    changeState() {

        if(this.currentStateFrame >= this.framesToStateSwitch/2){
            let states = Object.keys(Boulder.boulderState);
            let keyState = states[Math.floor(states.length * Math.random())];
            this.state = Boulder.boulderState[keyState];
            this.currentStateFrame = 0;
        }

    }

    slam(){
        if(this.currentStateFrame === 5){
            let divX = skeleton.position.x - this.position.x;
            let divY = skeleton.position.y - this.position.y;

            let hypotenuse = Math.sqrt(Math.abs(divX)**2 + Math.abs(divY)**2);

            let directionX = divX / hypotenuse;
            let directionY = divY / hypotenuse;

            this.moveBy.x = directionX;
            this.moveBy.y = directionY;
        }
    }

    bounce(){
        if(this.currentStateFrame === 5){
            let divX = skeleton.position.x - this.position.x;
            let divY = skeleton.position.y - this.position.y;

            let hypotenuse = Math.sqrt(Math.abs(divX)**2 + Math.abs(divY)**2);

            let directionX = divX / hypotenuse;
            let directionY = divY / hypotenuse;

            this.moveBy.x = directionX;
            this.moveBy.y = directionY;
        }
    }
}