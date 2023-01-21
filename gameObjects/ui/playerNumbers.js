class PlayerNumbers extends GameObject {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);

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
        gameManager.canvas.drawLayer.rect(this.position.x , this.position.y, this.dimensions.width * (skeleton.health / skeleton.maxHealth), this.dimensions.height* 0.30);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();

        // Bombs

        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "purple";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y + (this.dimensions.height* 0.30*2), this.dimensions.width / 7, this.dimensions.height* 0.30);
        gameManager.canvas.drawLayer.font = this.dimensions.height* 0.30+"px Verdana";
        gameManager.canvas.drawLayer.fillText(skeleton.bombNumber,this.position.x+(this.dimensions.width / 7)*1.2, this.position.y + (this.dimensions.height* 0.30*2.85));
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();



    }


}