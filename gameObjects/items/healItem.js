class HealItem extends PickUp{


    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "red";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.closePath();
    }

    effectOnPickUp(player){
        player.heal(20);
    }

}