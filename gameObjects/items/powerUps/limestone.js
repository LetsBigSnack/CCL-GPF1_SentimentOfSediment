class Limestone extends PickUp{

    effectOnPickUp(player){
        super.effectOnPickUp();

        gameManager.addGameObject(new InfoBanner("Limestone", "You feel lucky"));
        player.addLuck(1);

    }
}