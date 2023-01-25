class HealItem extends PickUp{


    draw() {
        if(this.healthImageLoaded){
            gameManager.canvas.drawLayer.drawImage(this.healthImage,this.position.x, this.position.y, 32, 32);
        }
    }

    effectOnPickUp(player){
        super.effectOnPickUp();
        player.heal(20);
    }

}