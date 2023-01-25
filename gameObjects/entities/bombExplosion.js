
class BombExplosion extends ImageObject {


    moveBy = {
        "x": 0,
        "y": 0
    };
    frameUntilExplode = 120;
    currentFrameCount = 0;
    explode = false;
    bombDamage = 300;

    //Code Double in Enemy, will fix Later

    constructor(name, x, y, width, height, src = "images/bomb_expl_sheet.png" ) {
        super(name, x, y, width, height,src);
        this.explode = true;
        this.animationDurationPerFrame = 3;
        this.addAnimationInformation("explosion", 0,7);
        this.setCurrentAnimationByName("explosion");

        if(gameManager.playSound){
            let bombSound = new Audio("Sounds/Heavy Magical Explosion_SI 03.wav");
            bombSound.volume = 0.3;
            bombSound.play();
        }

    }



    draw() {
        super.draw();
        if(this.currentAnimationFrame === 7){
            this.isActive = false;
        }
    }

    onCollision(otherObject) {
        if(this.explode){
            if(otherObject.name == "player" || otherObject.name == "enemy") {
                otherObject.health -= this.bombDamage;
            }
        }
    }

}