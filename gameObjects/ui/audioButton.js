class AudioButton extends GameObject {

    color = "#35a050";
    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.parent = parent;



    }


    draw() {

        gameManager.canvas.drawLayer.textAlign = "center";
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = this.color;
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.font = "20px Pixel";



        switch (this.name){
            case "Music":
                if(!gameManager.playMusic){
                    this.color = "red";
                }else{
                    this.color = "#35a050";
                }
                gameManager.canvas.drawLayer.strokeText(this.name, this.position.x+this.dimensions.width/2, this.position.y+ this.dimensions.height/2+10);
                gameManager.canvas.drawLayer.fillText(this.name, this.position.x+this.dimensions.width/2, this.position.y+ this.dimensions.height/2+10);
                break;
            case "Sound":
                if(!gameManager.playSound){
                    this.color = "red";
                }else{
                    this.color = "#35a050";
                }
                gameManager.canvas.drawLayer.strokeText(this.name, this.position.x+this.dimensions.width/2, this.position.y+ this.dimensions.height/2+10);
                gameManager.canvas.drawLayer.fillText(this.name, this.position.x+this.dimensions.width/2, this.position.y+ this.dimensions.height/2+10);
                break;
        }

        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
        gameManager.canvas.drawLayer.textAlign = "start";

    }

    onMouseEvent(mouseEvent) {
        this.update();

        if(mouseEvent === MouseHelper.mouseEventCodes.LeftClick){

            switch (this.name){

                case "Music":
                    gameManager.toggleMusic();
                    break;
                case "Sound":
                    gameManager.toggleSound();
                    break;

            }


        }
        if(mouseEvent === MouseHelper.mouseEventCodes.Hover){
            this.color = "#1d7533";
        }
    }

}