class BombItem extends PickUp{

    effectOnPickUp(player){
        super.effectOnPickUp();
        player.bombNumber++;

    }

    draw() {
        if(this.bombImage){
            gameManager.canvas.drawLayer.drawImage(this.bombImage,this.position.x, this.position.y, 32, 32);
        }
    }
    
}