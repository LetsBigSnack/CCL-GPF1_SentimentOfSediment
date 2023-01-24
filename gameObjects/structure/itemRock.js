class ItemRock extends Rock {

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.createdItem = false;
    }

    onCollision(otherObject) {
        super.onCollision(otherObject);
        if(this.destroyed && !this.createdItem){

            let item;

            switch (this.name){
                case "amethyst":
                    item = new Amethyst("amethyst", this.position.x+this.dimensions.width/4, this.position.y+this.dimensions.height/4, this.dimensions.width/2, this.dimensions.height/2, "images/powerups/ame.png");
                    break;
                case "granite":
                    item = new Granite("granite", this.position.x+this.dimensions.width/4, this.position.y+this.dimensions.height/4, this.dimensions.width/2, this.dimensions.height/2,"images/powerups/granite.png");
                    break;
                case "limestone":
                    item = new Limestone("limestone", this.position.x+this.dimensions.width/4, this.position.y+this.dimensions.height/4, this.dimensions.width/2, this.dimensions.height/2,"images/powerups/limestone.png");
                    break;
                case "obsidian":
                    item = new Obsidian("obsidian", this.position.x+this.dimensions.width/4, this.position.y+this.dimensions.height/4, this.dimensions.width/2, this.dimensions.height/2,"images/powerups/obsidian.png");
                    break;
                case "quartz":
                    item = new Quartz("quartz", this.position.x+this.dimensions.width/4, this.position.y+this.dimensions.height/4, this.dimensions.width/2, this.dimensions.height/2,"images/powerups/quartz.png");
                    break;
                case "ruby":
                    item = new Ruby("ruby", this.position.x+this.dimensions.width/4, this.position.y+this.dimensions.height/4, this.dimensions.width/2, this.dimensions.height/2, "images/powerups/ruby.png");
                    break;
            }
            //item = new HealItem("powerUp", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.addGameObject(item);
            gameManager.currentRoom.addEntity(item);
            this.createdItem = true;
        }

    }


}