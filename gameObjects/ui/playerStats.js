class PlayerStats extends GameObject {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);

        this.stat_speedImage = new Image();
        this.stat_speedImageLoaded = false;
        this.stat_speedImage.src = "images/UI/stat_speed.png";
        this.stat_speedImage.addEventListener("load", () => {
            this.stat_speedImageLoaded = true;
        });

        this.stat_luckImage = new Image();
        this.stat_luckImageLoaded = false;
        this.stat_luckImage.src = "images/UI/stat_luck.png";
        this.stat_luckImage.addEventListener("load", () => {
            this.stat_luckImageLoaded = true;
        });

        this.stat_dmgImage = new Image();
        this.stat_dmgImageLoaded = false;
        this.stat_dmgImage.src = "images/UI/stat_dmg.png";
        this.stat_dmgImage.addEventListener("load", () => {
            this.stat_dmgImageLoaded = true;
        });

        this.stat_cooldownImage = new Image();
        this.stat_cooldownImageLoaded = false;
        this.stat_cooldownImage.src = "images/UI/stat_cooldown.png";
        this.stat_cooldownImage.addEventListener("load", () => {
            this.stat_cooldownImageLoaded = true;
        });

        this.stat_durationImage = new Image();
        this.stat_durationImageLoaded = false;
        this.stat_durationImage.src = "images/UI/stat_duration.png";
        this.stat_durationImage.addEventListener("load", () => {
            this.stat_durationImageLoaded = true;
        });

        this.statImages = [
            this.stat_speedImage,
            this.stat_luckImage,
            this.stat_dmgImage,
            this.stat_cooldownImage,
            this.stat_durationImage
        ];


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
            gameManager.canvas.drawLayer.fillStyle = "white";
            gameManager.canvas.drawLayer.strokeStyle = "#000000";
            gameManager.canvas.drawLayer.drawImage(this.statImages[i],this.position.x, this.position.y + (this.dimensions.height* 0.15*i)+(this.dimensions.height* 0.05*(i+1)), 16, 16);
            gameManager.canvas.drawLayer.font = this.dimensions.height* 0.10+"px Pixel";
            gameManager.canvas.drawLayer.strokeText(playerStats[i]+"",this.position.x+(this.dimensions.width / 7)*1.2, this.position.y + this.dimensions.height* 0.15+  (this.dimensions.height* 0.15*i)+(this.dimensions.height* 0.05*(i+1)));
            gameManager.canvas.drawLayer.fillText(playerStats[i]+"",this.position.x+(this.dimensions.width / 7)*1.2, this.position.y + this.dimensions.height* 0.15+  (this.dimensions.height* 0.15*i)+(this.dimensions.height* 0.05*(i+1)));
            gameManager.canvas.drawLayer.fill();
            gameManager.canvas.drawLayer.stroke();
            gameManager.canvas.drawLayer.closePath();
        }

    }


}