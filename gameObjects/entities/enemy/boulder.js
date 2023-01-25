class Boulder extends Enemy {

    moveBy = {
        "x": 0,
        "y": 0
    };

    speed = 4;
    health = 10000;
    damage = 10;


    static boulderState = {
        Idle: 0,
        Slamming: 1,
        Bouncing: 2
    };
    state = Boulder.boulderState.Idle;

    framesToStateSwitch = 200;
    currentStateFrame  = 0;


    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height,src);
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
                this.moveBy.x = 0;
                this.moveBy.y = 0;
                this.setCurrentAnimationByName("idle");
            }
            this.currentStateFrame++;
                switch (this.state){
                    case Boulder.boulderState.Idle:
                        this.moveBy.x = 0;
                        this.moveBy.y = 0;
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
            this.position.x = Math.round(this.position.x);
            this.position.y = Math.round(this.position.y);
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


        if(otherObject instanceof Obstacle) {


            if(gameManager.playSound){

                let rng = Math.random();
                let collisonSound =new Audio("Sounds/PM_RI_Designed_19 Rocks Impact Hit Big LFE Heavy Designed.wav");
                collisonSound.volume = 0.4;
                collisonSound.play();
            }


            this.restorePosition();
            switch (this.state){
                case Boulder.boulderState.Slamming:
                    this.moveBy.x = 0;
                    this.moveBy.y = 0;
                    this.state = Boulder.boulderState.Idle;
                    this.setCurrentAnimationByName("idle");
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
            if(this.state === Boulder.boulderState.Bouncing){
                this.setCurrentAnimationByName("chargeUp_1");
            }
            if(this.state === Boulder.boulderState.Slamming){
                this.setCurrentAnimationByName("chargeUp_2");
            }
            this.currentStateFrame = 0;
        }

    }

    slam(){
        if(this.currentStateFrame === 45){
            this.setCurrentAnimationByName("attack");
            let divX = skeleton.position.x - this.position.x;
            let divY = skeleton.position.y - this.position.y;

            let hypotenuse = Math.sqrt(Math.abs(divX)**2 + Math.abs(divY)**2);

            let directionX = divX / hypotenuse;
            let directionY = divY / hypotenuse;

            this.moveBy.x = directionX*2;
            this.moveBy.y = directionY*2;
        }
    }

    bounce(){
        if(this.currentStateFrame === 45){
            this.setCurrentAnimationByName("attack");
            let divX = skeleton.position.x - this.position.x;
            let divY = skeleton.position.y - this.position.y;

            let hypotenuse = Math.sqrt(Math.abs(divX)**2 + Math.abs(divY)**2);

            let directionX = divX / hypotenuse;
            let directionY = divY / hypotenuse;

            this.moveBy.x = directionX*2;
            this.moveBy.y = directionY*2;
        }
    }
}