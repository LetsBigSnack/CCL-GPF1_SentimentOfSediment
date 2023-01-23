class MenuButton extends GameObject {

    color = "green";

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

    static buttonNames = {
        Play: "Play",
        Story: "Story",
        HTP: "How to Play",
        Credits : "Credits"
    }
    onMouseEvent(mouseEvent) {
        //console.log("Mouse Event on: ", this.name, " - " ,mouseEvent);
        if(mouseEvent === MouseHelper.mouseEventCodes.LeftClick){
            switch (this.name) {
                case MenuButton.buttonNames.Play:
                    gameManager.restartGame();
                    gameManager.currentState = GameManager.states.Playing;
                    break;
                case MenuButton.buttonNames.Story:
                    new InfoPanel("",gameManager.canvas.canvasBoundaries.right/2-150, gameManager.canvas.canvasBoundaries.bottom/2-200, 300,400, "images/menu_story.png");
                    break;
                case MenuButton.buttonNames.HTP:
                    new InfoPanel("",gameManager.canvas.canvasBoundaries.right/2-150, gameManager.canvas.canvasBoundaries.bottom/2-200, 300,400, "images/menu_htp.png");
                    break;
                case MenuButton.buttonNames.Credits:
                    new InfoPanel("",gameManager.canvas.canvasBoundaries.right/2-150, gameManager.canvas.canvasBoundaries.bottom/2-200, 300,400, "images/menu_credits.png");
                    break;

            }
        }
        if(mouseEvent === MouseHelper.mouseEventCodes.Hover){
            this.color = "#1d7533";
        }
    }



}