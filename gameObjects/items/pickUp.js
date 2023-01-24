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
    }


    onCollision(otherObject) {
        if(otherObject.name == "player") {

            this.effectOnPickUp(otherObject);
            this.isActive = false;
        }
    }

    effectOnPickUp(otherObject){

    }

}