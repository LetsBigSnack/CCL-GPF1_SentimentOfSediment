class Wall extends Obstacle {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
 
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "#660000";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();   
    }
    
    
}