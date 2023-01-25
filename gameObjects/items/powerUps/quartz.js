class Quartz extends PickUp{

    effectOnPickUp(player){
        super.effectOnPickUp();
        gameManager.addGameObject(new InfoBanner("Quartz", "Longer invincible time"));
        player.addInvincibilityCooldown(10);
    }

}