class Granite extends PickUp{

    effectOnPickUp(player){
        super.effectOnPickUp();

        gameManager.addGameObject(new InfoBanner("Granite", "Punch Speed and Speed"));
        player.subPunchCooldown(50);
        player.addMoveVelocity(0.5);

    }
}