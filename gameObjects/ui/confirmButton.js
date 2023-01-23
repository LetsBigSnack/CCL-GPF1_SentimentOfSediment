class ConfirmButton extends ImageObject {

    color = "green";

    constructor(name, x, y, width, height, src, parent) {
        super(name, x, y, width, height, src);
        this.parent = parent;

    }

    update() {
        super.update();
        this.color = "#35a050";
    }


    draw() {
        gameManager.canvas.drawLayer.textAlign = "center";
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = this.color;
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        //gameManager.canvas.drawLayer.rect(this.position.x, this.position.y,this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.font = "20px Pixel";
        gameManager.canvas.drawLayer.strokeText(this.name, this.position.x+this.dimensions.width/2, this.position.y+ this.dimensions.height/2+10);
        gameManager.canvas.drawLayer.fillText(this.name, this.position.x+this.dimensions.width/2, this.position.y+ this.dimensions.height/2+10);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
        gameManager.canvas.drawLayer.textAlign = "start";
    }


    onMouseEvent(mouseEvent) {
        this.update();
        console.log("Mouse Event on: ", this.name, " - " ,mouseEvent);
        if(mouseEvent === MouseHelper.mouseEventCodes.LeftClick){
            this.isActive = false;
            this.parent.isActive = false;
            this.parent.confirmButton.isActive = false;

            if(this.parent instanceof PauseMenu){
                gameManager.togglePause();
            }

        }
        if(mouseEvent === MouseHelper.mouseEventCodes.Hover){
            this.color = "#1d7533";
        }
    }



}