class Rock extends Obstacle {

    destroyed = false;
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);

    }


    onCollision(otherObject) {
        super.onCollision(otherObject);
        if(otherObject.name == "bomb" && otherObject.explode) {
            this.isActive = false;
            this.destroyed = true;
        }
    }


}