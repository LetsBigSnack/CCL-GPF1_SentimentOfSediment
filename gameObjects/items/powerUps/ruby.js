class Ruby extends PickUp{

    effectOnPickUp(player){
        gameManager.addGameObject(new InfoBanner("Ruby", "Shiny all around"));
        player.addHealth(5);
        player.subPunchCooldown(10);
        player.addMoveVelocity(0.1);
        player.addLuck(1);
        player.addPunchDamage(25);
        player.addInvincibilityCooldown(5);
    }
}