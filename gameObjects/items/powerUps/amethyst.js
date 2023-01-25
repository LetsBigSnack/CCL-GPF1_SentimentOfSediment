class Amethyst extends PickUp{



    effectOnPickUp(player){

        super.effectOnPickUp();
        gameManager.addGameObject(new InfoBanner("Amethyst", "Max Health and a Heal"));
        player.addHealth(30);
    }

}