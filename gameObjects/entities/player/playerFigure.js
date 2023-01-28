
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



    static playerStates = {
        Idle_Front: "Idle_Front",
        Idle_Left: "Idle_Left",
        Idle_Right: "Idle_Right",
        Idle_Bottom: "Idle_Bottom",
        Run_Front: "Run_Front",
        Run_Left: "Run_Left",
        Run_Right: "Run_Right",
        Run_Bottom: "Run_Bottom",
        Punch_Front: "Punch_Front",
        Punch_Left: "Punch_Left",
        Punch_Right: "Punch_Right",
        Punch_Bottom: "Punch_Bottom",
    };

    isPunching = false;
    currentState = PlayerFigure.playerStates.Idle_Front;

    animationResetFrameCooldown = 120;
    currentAnimationReset  =0;
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        console.log("PlayerFigure has been created");

        this.mass = .6;
    }

    update() {
        this.currentAnimationReset++;
        if(this.health <= 0){
            this.health = 0;
            this.isActive = false;
            if(gameManager.playSound){
                let deathSound = new Audio("Sounds/Hit Rock Debris_RBD 02.wav");
                deathSound.volume = 0.2;
                deathSound.play();
            }
            gameManager.gameOver();
        }
        this.checkInvicibility();
        this.position.x += this.moveBy.left;
        this.position.y += this.moveBy.top;
        this.position.x = Math.round(this.position.x);
        this.position.y = Math.round(this.position.y);
        if(this.punch){
            switch (this.currentState){
                case PlayerFigure.playerStates.Punch_Front:
                    if(this.currentAnimationFrame === 15){
                        console.log("punch");
                        this.spawnPunch(this.punch);
                    }
                    break;
                case PlayerFigure.playerStates.Punch_Left:
                    if(this.currentAnimationFrame === 64){
                        console.log("punch");
                        this.spawnPunch(this.punch);
                    }
                    break;
                case PlayerFigure.playerStates.Punch_Right:
                    if(this.currentAnimationFrame === 34){
                        console.log("punch");
                        this.spawnPunch(this.punch);
                    }
                    break;
                case PlayerFigure.playerStates.Punch_Bottom:

                    if(this.currentAnimationFrame === 48){
                        console.log("punch");
                        this.spawnPunch(this.punch);
                    }
                    break;
            }

        }
        if(this.bomb){
            this.spawnBomb();

        }
        this.checkWorldPostion();


        let isKeyPressed = false;

        for (const [key, value] of Object.entries(pressedKeys)) {
            if (value){
                isKeyPressed = true;
            }
        }

        if(!isKeyPressed) {
            if(this.currentState.includes("Idle")){
                this.switchState("Idle_Back");
            }

        }

        /**
         if(this.currentAnimationReset >= this.animationResetFrameCooldown){
            console.log("test");
            let isKeyPressed = false;

            for (const [key, value] of Object.entries(pressedKeys)) {
                if (value){
                    isKeyPressed = true;
                }
            }

            if(!isKeyPressed) {
                this.switchState(PlayerFigure.playerStates.Idle_Bottom);
            }
            this.currentAnimationReset = 0;
        }
         */
    }

    switchState(stateName){
        console.log(stateName);
        if(stateName !== this.currentState && !this.isPunching){

            this.currentState = stateName;

            switch (stateName){

                case PlayerFigure.playerStates.Idle_Front:
                    this.setCurrentAnimationByName("idle_up");
                    break;
                case PlayerFigure.playerStates.Idle_Left:
                    this.setCurrentAnimationByName("idle_left");
                    break;
                case PlayerFigure.playerStates.Idle_Right:
                    this.setCurrentAnimationByName("idle_right");
                    break;
                case PlayerFigure.playerStates.Idle_Bottom:
                    this.setCurrentAnimationByName("idle_down");
                    break;
                case PlayerFigure.playerStates.Run_Front:
                    this.setCurrentAnimationByName("walk_up");
                    break;
                case PlayerFigure.playerStates.Run_Left:
                    skeleton.setCurrentAnimationByName("walk_left");
                    break;
                case PlayerFigure.playerStates.Run_Right:
                    skeleton.setCurrentAnimationByName("walk_right");
                    break;
                case PlayerFigure.playerStates.Run_Bottom:
                    skeleton.setCurrentAnimationByName("walk_down");
                    break;
                case PlayerFigure.playerStates.Punch_Front:
                    if(this.punchCooldown) {
                        skeleton.setCurrentAnimationByName("punch_front");
                        this.isPunching = true;
                    }

                    break;
                case PlayerFigure.playerStates.Punch_Left:
                    if(this.punchCooldown) {
                        skeleton.setCurrentAnimationByName("punch_left");
                        this.isPunching = true;
                    }
                    break;
                case PlayerFigure.playerStates.Punch_Right:
                    if(this.punchCooldown) {
                        skeleton.setCurrentAnimationByName("punch_right");
                        this.isPunching = true;
                    }
                    break;
                case PlayerFigure.playerStates.Punch_Bottom:
                    if(this.punchCooldown) {
                        skeleton.setCurrentAnimationByName("punch_bottom");
                        this.isPunching = true;
                    }
                    break;
            }
        }
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
            this.isPunching = false;

            this.switchState(PlayerFigure.playerStates.Idle_Bottom);
            if(pressedKeys["w"]){
                this.switchState(PlayerFigure.playerStates.Run_Front);
            }if(pressedKeys["a"]){
                this.switchState(PlayerFigure.playerStates.Run_Left);
            }
            if(pressedKeys["s"]){
                this.switchState(PlayerFigure.playerStates.Run_Bottom);
            }
            if(pressedKeys["d"]){
                this.switchState(PlayerFigure.playerStates.Run_Right);
            }

            let punchObject;
            switch (punch){
                case "left":
                    punchObject = new PlayerPunch("punch", this.position.x-32, this.position.y,64,64, -64, 0, "left" ,"images/punch_left.png");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    }, this.punchDuration)

                    break;
                case "right":
                    punchObject = new PlayerPunch("punch", this.position.x+this.dimensions.width-32, this.position.y,64,64, this.dimensions.width, 0, "right","images/punch_right.png");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    },  this.punchDuration)

                    break;
                case "up":
                    punchObject = new PlayerPunch("punch", this.position.x, this.position.y-this.dimensions.height+32,64,64, 0, -this.dimensions.height, "up", "images/punch_up.png");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    },  this.punchDuration)
                    break;

                case "down":
                    punchObject = new PlayerPunch("punch", this.position.x, this.position.y+this.dimensions.height-32,64,64, 0, +this.dimensions.height, "down","images/punch_down.png");
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    },  this.punchDuration)
                    break;

                    break;
            }
            setTimeout(() => {
                this.punchCooldown = true;
                this.currentState = PlayerFigure.playerStates.Idle_Bottom;
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
                gameManager.canvas.drawLayer.rect(  this.boundaryOffsets.left+ this.position.x, this.position.y + this.boundaryOffsets.top, this.dimensions.width+this.boundaryOffsets.right-this.boundaryOffsets.left, this.dimensions.height+this.boundaryOffsets.bottom-this.boundaryOffsets.top);
                gameManager.canvas.drawLayer.fill();
                gameManager.canvas.drawLayer.stroke();
                gameManager.canvas.drawLayer.closePath();
            }else {
                gameManager.canvas.drawLayer.beginPath();
                gameManager.canvas.drawLayer.fillStyle = "red";
                gameManager.canvas.drawLayer.strokeStyle = "#000000";
                gameManager.canvas.drawLayer.rect(  this.boundaryOffsets.left+ this.position.x, this.position.y + this.boundaryOffsets.top, this.dimensions.width+this.boundaryOffsets.right-this.boundaryOffsets.left, this.dimensions.height+this.boundaryOffsets.bottom-this.boundaryOffsets.top);
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
            let bomb = new Bomb("bomb", this.position.x+16, this.position.y+32,32,32);
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
                if(gameManager.playSound){

                    let pickUpSound = new Audio("Sounds/Bluezone_BC0272_creature_attack_whoosh_impact_003.wav");
                    pickUpSound.volume = 0.3;
                    pickUpSound.play();
                }
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

    resetPlayer(){

        this.position.x = 352
        this.position.y = 224;
        this.moveBy.x = 0;
        this.moveBy.y = 0;

        this.isActive = true;
        this.moveVelocity = 3;

        this.maxHealth = 100;
        this. health = 100;

        this.luck = 1;
        this.punch = "";
        this.bomb = false;
        this.bombNumber = 1;
        this.isPunching = false;
        this.punch = "";
        this.punchCooldown = true;
        this.punchCooldownTimer = 1000;
        this.punchDamage = 50;
        this.punchDuration = 200;

        this.invincible = false;
        this.invincibleFrame = 0;
        this.invincibilityFramesCooldown = 30;


    }

}