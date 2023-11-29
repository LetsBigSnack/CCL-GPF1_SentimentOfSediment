class PlayerNumbers extends GameObject {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.healthImage = new Image();
        this.healthImageLoaded = false;
        this.healthImage.src = "images/UI/health.png";
        this.healthImage.addEventListener("load", () => {
            this.healthImageLoaded = true;
        });


        this.bombImage = new Image();
        this.bombImageLoaded = false;
        this.bombImage.src = "images/UI/dynamite.png";
        this.bombImage.addEventListener("load", () => {
            this.bombImageLoaded = true;
        });
    }

    draw() {



        //Health
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "#000000";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x , this.position.y, this.dimensions.width, this.dimensions.height * 0.30);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();

        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "red";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x , this.position.y, this.dimensions.width * (playerFigure.health / playerFigure.maxHealth), this.dimensions.height* 0.30);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();

        if(this.healthImageLoaded){
            //Health Icon
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(this.healthImage,this.position.x-16 , this.position.y-8, 32, 32);
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }

        // Bombs

        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "white";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.font = this.dimensions.height* 0.30+"px Pixel";
        gameManager.canvas.drawLayer.fillText(playerFigure.bombNumber,this.position.x+(this.dimensions.width / 7)*1.2, this.position.y + (this.dimensions.height* 0.30*2.85));
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();

        if(this.bombImageLoaded){
            //Health Icon
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(this.bombImage,this.position.x-16 , this.position.y + (this.dimensions.height* 0.30*2.85)-32, 32, 32);
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }



    }


}