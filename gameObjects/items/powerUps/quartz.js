class Quartz extends PickUp{

    effectOnPickUp(player){
        gameManager.addGameObject(new InfoBanner("Quartz", "Longer invincible time"));
        player.addInvincibilityCooldown(10);
    }

}