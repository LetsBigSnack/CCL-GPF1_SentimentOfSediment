class Obstacle extends ImageObject {

    placement = "";
    constructor(name, x, y, width, height,src="images/character_spritesheett.png") {
        super(name, x, y, width, height,src);
        this.isRigid = true;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player" || otherObject.name == "enemy") {
            otherObject.restorePosition();
        }
    }
}