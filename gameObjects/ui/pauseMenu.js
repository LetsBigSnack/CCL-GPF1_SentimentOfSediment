class PauseMenu extends ImageObject {

    color = "green";

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.confirmButton = new ConfirmButton("Continue", this.position.x, this.position.y+this.dimensions.height-this.dimensions.height/1.65,this.dimensions.width, this.dimensions.height/7, "images/character_spritesheett.png", this);
        this.menuButton= new ConfirmButton("Menu", this.position.x, this.position.y+this.dimensions.height-this.dimensions.height/1.65+this.dimensions.height/7,this.dimensions.width, this.dimensions.height/7, "images/character_spritesheett.png", this);
        this.soundToggleButton= new AudioButton("Sound", this.position.x+this.dimensions.width/2.5, this.position.y+this.dimensions.height/5.5,this.dimensions.width/2, this.dimensions.height/10);
        this.musicToggleButton= new AudioButton("Music", this.position.x+this.dimensions.width/2.5, this.position.y+this.dimensions.height/5.5+this.dimensions.height/10 ,this.dimensions.width/2, this.dimensions.height/10);

        gameManager.gameObjects.push(this);
        gameManager.gameObjects.push(this.confirmButton);
        gameManager.gameObjects.push(this.menuButton);
        gameManager.gameObjects.push(this.musicToggleButton);
        gameManager.gameObjects.push(this.soundToggleButton);
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
        this.musicToggleButton.isActive = false;
        this.soundToggleButton.isActive = false;
    }


}