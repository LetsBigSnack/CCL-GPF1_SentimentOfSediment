class Limestone extends PickUp{

    effectOnPickUp(player){

        gameManager.addGameObject(new InfoBanner("Limestone", "You feel lucky"));
        player.addLuck(1);

    }
}