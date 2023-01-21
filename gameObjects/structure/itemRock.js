class ItemRock extends Rock {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.createdItem = false;
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "#cccccc";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.closePath();
    }

    onCollision(otherObject) {
        super.onCollision(otherObject);
        if(this.destroyed && !this.createdItem){

            let item;

            switch (this.name){
                case "amethyst":
                    item = new Amethyst("amethyst", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                    break;
                case "granite":
                    item = new Granite("granite", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                    break;
                case "limestone":
                    item = new Limestone("limestone", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                    break;
                case "obsidian":
                    item = new Obsidian("obsidian", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                    break;
                case "quartz":
                    item = new Quartz("quartz", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                    break;
                case "ruby":
                    item = new Ruby("ruby", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
                    break;
            }
            //item = new HealItem("powerUp", this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.addGameObject(item);
            gameManager.currentRoom.addEntity(item);
            this.createdItem = true;
        }

    }


}