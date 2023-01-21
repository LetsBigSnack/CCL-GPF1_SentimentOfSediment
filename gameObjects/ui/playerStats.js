class PlayerStats extends GameObject {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);

    }

    draw() {
        let playerStats = [
            skeleton.moveVelocity,
            skeleton.luck,
            skeleton.punchDamage,
            skeleton.punchCooldownTimer,
            skeleton.punchDuration
        ];
        for(let i = 0; i < 5;i++){
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.fillStyle = "green";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.rect(this.position.x, this.position.y + (this.dimensions.height* 0.15*i)+(this.dimensions.height* 0.05*(i+1)), this.dimensions.width / 7, this.dimensions.height* 0.15);
            gameManager.canvas.drawLayer.font = this.dimensions.height* 0.15+"px Verdana";
            gameManager.canvas.drawLayer.fillText(playerStats[i]+"",this.position.x+(this.dimensions.width / 7)*1.2, this.position.y + this.dimensions.height* 0.15+  (this.dimensions.height* 0.15*i)+(this.dimensions.height* 0.05*(i+1)));
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }

    }


}