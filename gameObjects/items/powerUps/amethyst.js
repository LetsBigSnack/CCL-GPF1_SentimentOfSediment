class Amethyst extends PickUp{



    effectOnPickUp(player){
        gameManager.addGameObject(new InfoBanner("Amethyst", "Max Health and a Heal"));
        player.addHealth(30);
    }

}