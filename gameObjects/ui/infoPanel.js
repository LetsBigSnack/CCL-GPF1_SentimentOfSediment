class InfoPanel extends ImageObject {

    color = "green";

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.confirmButton = new ConfirmButton("confirm", this.position.x, this.position.y+this.dimensions.height-this.dimensions.height/4,this.dimensions.width, this.dimensions.height/7, "images/character_spritesheett.png", this);
        gameManager.menuElements.push(this);
        gameManager.menuElements.push(this.confirmButton);
        console.log("dsadsda");
    }

    update() {
        super.update();
        this.color = "#35a050";
    }


}