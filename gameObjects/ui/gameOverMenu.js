class GameOverMenu extends ImageObject {

    color = "green";

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.confirmButton = new ConfirmButton("Retry", this.position.x, this.position.y+this.dimensions.height-this.dimensions.height/1.65,this.dimensions.width, this.dimensions.height/7, "images/character_spritesheett.png", this);
        this.menuButton= new ConfirmButton("Menu", this.position.x, this.position.y+this.dimensions.height-this.dimensions.height/1.65+this.dimensions.height/7,this.dimensions.width, this.dimensions.height/7, "images/character_spritesheett.png", this);
        gameManager.gameObjects.push(this);
        gameManager.gameObjects.push(this.confirmButton);
        gameManager.gameObjects.push(this.menuButton);
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
        this.menuButton.isActive = false;
    }


}