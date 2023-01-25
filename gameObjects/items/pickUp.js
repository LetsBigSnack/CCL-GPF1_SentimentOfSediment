class PickUp extends ImageObject{

    static RockTypes = [
        "amethyst",
        "granite",
        "limestone",
        "obsidian",
        "quartz",
        "ruby"
    ];

    static RockTypesImages = {
        amethyst : "images/powerups/rock_ame.png",
        granite : "images/powerups/rock_granite.png",
        limestone: "images/powerups/rock_limestone.png",
        obsidian: "images/powerups/rock_obsidian.png",
        quartz: "images/powerups/rock_quartz.png",
        ruby : "images/powerups/rock_ruby.png"
    };


    constructor(name, x, y, width, height,src="images/powerups/rock_ame.png") {
        super(name, x, y, width, height,src);

        this.healthImage = new Image();
        this.healthImageLoaded = false;
        this.healthImage.src = "images/UI/health.png";
        this.healthImage.addEventListener("load", () => {
            this.healthImageLoaded = true;
        });


        this.bombImage = new Image();
        this.bombImageLoaded = false;
        this.bombImage.src = "images/UI/dynamite.png";
        this.bombImage.addEventListener("load", () => {
            this.bombImageLoaded = true;
        });

    }


    onCollision(otherObject) {
        if(otherObject.name == "player") {

            this.effectOnPickUp(otherObject);
            this.isActive = false;
        }
    }

    effectOnPickUp(otherObject){
        if(gameManager.playSound){

            let pickUpSound = new Audio("Sounds/PM_RI_Source_53 Rocks Impact Hit Single Stone.wav");
            pickUpSound.volume = 0.3;
            pickUpSound.play();
            console.log("pick up");
        }
    }

}