class Obsidian extends PickUp{

    effectOnPickUp(player){
        super.effectOnPickUp();
        gameManager.addGameObject(new InfoBanner("Obsidian", "The obsidian made your fist harder. Your Punch-Damage went up"));
        player.addPunchDamage(50);
    }
}