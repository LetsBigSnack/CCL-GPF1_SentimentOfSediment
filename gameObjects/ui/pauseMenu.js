class PauseMenu extends ImageObject {

    color = "green";

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.confirmButton = new ConfirmButton("Continue", this.position.x, this.position.y+this.dimensions.height-this.dimensions.height/4,this.dimensions.width, this.dimensions.height/7, "images/character_spritesheett.png", this);
        gameManager.gameObjects.push(this);
        gameManager.gameObjects.push(this.confirmButton);
    }

    update() {
        super.update();
        this.color = "#35a050";
    }

    onMouseEvent(mouseEvent) {
        this.update();
    }

    disable(){
        this.isActive = false;
        this.confirmButton.isActive = false;
    }


}