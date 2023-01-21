class InfoBanner extends GameObject {

    shownFrames = 200;
    currentFrames = 0;

    constructor(title, displayText) {
        super("infoBaner", gameManager.canvas.canvasBoundaries.right / 4, 120, gameManager.canvas.canvasBoundaries.right / 2, 100);
        this.title = title;
        this.displayText = displayText;
    }

    draw() {
        //TODO make more dynamic
        if(this.currentFrames <= this.shownFrames){
            gameManager.canvas.drawLayer.beginPath();
            if(this.currentFrames <= this.shownFrames/4){

                let alpha = 0.1 + (this.currentFrames*0.05);
                if(alpha >= 1){
                    alpha = 1;
                }

                gameManager.canvas.drawLayer.globalAlpha = alpha;
            }else if(this.currentFrames >=  (this.shownFrames/4)*3){
                let alpha = 0.1 + ((this.currentFrames-1-(this.shownFrames/4*3))*0.05);
                if(alpha >= 1){
                    alpha = 1;
                }
                alpha = 1-alpha;
                gameManager.canvas.drawLayer.globalAlpha = alpha
            }else{
                gameManager.canvas.drawLayer.globalAlpha = 1;
            }
            gameManager.canvas.drawLayer.fillStyle = "white";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.rect(this.position.x , this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.fillStyle = "black";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.font = "30px Verdana";
            gameManager.canvas.drawLayer.textAlign = "center";
            gameManager.canvas.drawLayer.fillText(this.title, this.position.x+this.dimensions.width/2,  this.position.y+ this.dimensions.height/2-15, 100);
            gameManager.canvas.drawLayer.closePath();

            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.fillStyle = "darkgrey";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.textAlign = "center";
            gameManager.canvas.drawLayer.font = "20px Verdana";
            gameManager.canvas.drawLayer.fillText(this.displayText, this.position.x+this.dimensions.width/2,  this.position.y+ this.dimensions.height/2+10, this.dimensions.width-10);
            gameManager.canvas.drawLayer.closePath();

            gameManager.canvas.drawLayer.globalAlpha = 1;
            gameManager.canvas.drawLayer.textAlign = "start";
            this.currentFrames++;
        }else{
            this.isActive = false;
        }


    }


}