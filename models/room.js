class Room{

    static connections = {
        North : "n",
        East : "e",
        South : "s",
        West : "w"
    }

    static oppositeDirections = {
        "n" : "s",
        "e" : "w",
        "s" : "n",
        "w" : "e"
    }

    static generatorDirections = {
        "n" : [0,1],
        "e" : [1,0],
        "s" : [0,-1],
        "w" : [-1,0]
    }

    static roomTypes = {
        Normal : 0,
        Item : 1,
        Boss: 2,
        Shop : 3
    };



    x_pos;
    y_pos;

    constructor(x_pos, y_pos, type = Room.roomTypes.Normal) {
        //TODO add visited attribute

        this.type = type;

        this.x_pos = x_pos;
        this.y_pos = y_pos;

        this.tileDimensions = {
            x: 64,
            y: 64
        }
        this.roomTiles = Array.from(Array(8), () => new Array(12));
        this.connectedRooms = [];
        this.containedEntites = [];
        this.numberConnections = 0;
        this.visitedByGenerator = false;
        this.alreadyFilled = false;
        this.visited = false;
    }

    setUpWalls(){
        let itemRockSpawned = false;
        let bossSpawned = false;
        for (let y = 0; y < this.roomTiles.length; y++){
            for (let x = 0; x < this.roomTiles[y].length; x++){
                if(y === 0 || y === this.roomTiles.length-1){

                    if(y === 0 && (x === 5 || x === 6)){
                        if( this.connectedRooms["n"] ){
                            if(x === 5){
                                this.roomTiles[y][x] =   new Door("n", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_door_top_open_left.png", "images/wall_door_top_closed_left.png");

                            }else{
                                this.roomTiles[y][x] =   new Door("n", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_door_top_open_right.png", "images/wall_door_top_closed_right.png");

                            }
                            this.roomTiles[y][x].placement = "top";
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }

                    if(y === this.roomTiles.length-1 && (x === 5 || x === 6)){
                        if( this.connectedRooms["s"]){

                            if(x === 5){
                                this.roomTiles[y][x] =   new Door("s", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_door_bottom_open_left.png", "images/wall_door_bottom_closed_left.png");

                            }else{
                                this.roomTiles[y][x] =   new Door("s", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_door_bottom_open_right.png", "images/wall_door_bottom_closed_right.png");

                            }
                            this.roomTiles[y][x].placement = "bottom";
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }
                    if(y === 0){
                        if(x === 0){
                            this.roomTiles[y][x] = new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_top_left.png");

                        }else if(x ===this.roomTiles[y].length-1) {
                            this.roomTiles[y][x] = new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_top_right.png");

                        }else{
                            this.roomTiles[y][x] =   new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_top_"+ Math.floor(Math.random() * 3) +".png");
                        }

                    }else if (y === this.roomTiles.length-1) {

                        if(x === 0){
                            this.roomTiles[y][x] = new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_bottom_left.png");

                        }else if(x ===this.roomTiles[y].length-1) {
                            this.roomTiles[y][x] = new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_bottom_right.png");

                        }else{
                            this.roomTiles[y][x] =   new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_bottom_"+ Math.floor(Math.random() * 3) +".png");
                        }
                    }

                    this.containedEntites.push(this.roomTiles[y][x]);

                }else if(x === 0 || x === this.roomTiles[y].length-1){


                    if(x === 0 && (y === 3 || y === 4)){

                        if( this.connectedRooms["w"] ){

                            if(y === 3){
                                this.roomTiles[y][x] =   new Door("w", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y,"images/wall_door_left_open_up.png", "images/wall_door_left_closed_up.png");

                            }else{
                                this.roomTiles[y][x] =   new Door("w", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y,"images/wall_door_left_open_down.png", "images/wall_door_left_closed_down.png");

                            }
                             this.roomTiles[y][x].placement = "left";
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }

                    if(x === this.roomTiles[y].length-1 && (y === 3 || y === 4)){
                        if( this.connectedRooms["e"]){

                            if(y === 3){
                                this.roomTiles[y][x] =   new Door("e", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y,"images/wall_door_right_open_up.png", "images/wall_door_right_closed_up.png");

                            }else{
                                this.roomTiles[y][x] =   new Door("e", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y,"images/wall_door_right_open_down.png", "images/wall_door_right_closed_down.png");

                            }
                             this.roomTiles[y][x].placement = "right";
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }

                    if(x === 0){
                        this.roomTiles[y][x] =   new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_left_"+ Math.floor(Math.random() * 3) +".png");

                    }else if (x === this.roomTiles[y].length-1) {
                        this.roomTiles[y][x] =   new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, "images/wall_right_"+ Math.floor(Math.random() * 3) +".png");
                    }


                    this.containedEntites.push(this.roomTiles[y][x]);

                }else{
                    //Reworke Item rock spawn // just used for testing
                    if(this.type === Room.roomTypes.Item && !itemRockSpawned && y > 4 && y < 6 && x > 3 && x < 10 ){
                        let rng = Math.random();
                        if(rng > 0.5){
                            let rockChoice = PickUp.RockTypes[Math.floor(Math.random()*PickUp.RockTypes.length)];
                            this.roomTiles[y][x] = new ItemRock(rockChoice, x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y, PickUp.RockTypesImages[rockChoice]);
                            this.containedEntites.push(this.roomTiles[y][x]);
                            itemRockSpawned = true;
                        }
                    }

                    if(this.type !== Room.roomTypes.Item && y > 4 && y < 6 && x > 3 && x < 10 ){

                        if(this.x_pos !== 0 || this.y_pos !== 0){
                            let rng = Math.random();
                            let chance = 0.75;

                            if(this.type === Room.roomTypes.Boss){
                                if(!bossSpawned){
                                    this.roomTiles[y][x] = new Boulder("enemy", 352, 224, this.tileDimensions.x*2, this.tileDimensions.y*2 ,"images/enemies/boss-Sheet.png")
                                    this.roomTiles[y][x].addAnimationInformation("idle", 0, 11);
                                    this.roomTiles[y][x].addAnimationInformation("chargeUp_1", 12, 15);
                                    this.roomTiles[y][x].addAnimationInformation("chargeUp_2", 18, 21);
                                    this.roomTiles[y][x].addAnimationInformation("attack", 17, 17);
                                    this.roomTiles[y][x].setCurrentAnimationByName("idle");
                                    this.roomTiles[y][x].setBoundaryOffsets(0,0,15,-15);
                                    bossSpawned = true;
                                    this.containedEntites.push(this.roomTiles[y][x]);
                                }
                            }else{
                                if(rng > chance){

                                    let rng_Enemy = Math.random();

                                    if(rng_Enemy < 0.75){
                                        this.roomTiles[y][x] = new Enemy("enemy", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y ,"images/enemies/enemy_2-Sheet.png")
                                        this.roomTiles[y][x].addAnimationInformation("walk", 0, 7);
                                        this.roomTiles[y][x].setCurrentAnimationByName("walk");
                                        this.roomTiles[y][x].setBoundaryOffsets(15,-15,10,-5);
                                    }else{
                                        this.roomTiles[y][x] = new ShootingEnemy("enemy", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y ,"images/enemies/enemy_1-Sheet.png")
                                        this.roomTiles[y][x].addAnimationInformation("walk", 0, 3);
                                        this.roomTiles[y][x].setCurrentAnimationByName("walk");
                                        this.roomTiles[y][x].setBoundaryOffsets(15,-15,10,-5);
                                    }


                                    this.containedEntites.push(this.roomTiles[y][x]);
                                }
                            }


                        }

                    }

                    /**
                     * let rng = Math.random();
                     *                     if(rng > 1){
                     *                         this.roomTiles[y][x] = new ItemRock("rock", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y)
                     *                         this.containedEntites.push(this.roomTiles[y][x]);
                     *                     }else if(rng < 0.15 && rng > 0.1 ){
                     *                         this.roomTiles[y][x] = new BombItem("bombItem", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y)
                     *                         this.containedEntites.push(this.roomTiles[y][x]);
                     *                     }else if(rng < 0.05) {
                     *                         this.roomTiles[y][x] = new HealItem("healItem", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y)
                     *                         this.containedEntites.push(this.roomTiles[y][x]);
                     *                     }
                     */

                }
                if(y === 0 && x !== 0 && x !== this.roomTiles[y].length-1){
                    this.roomTiles[y][x].placement = "top";
                }else if(y === this.roomTiles.length-1 && x !== 0 && x !== this.roomTiles[y].length-1){
                    this.roomTiles[y][x].placement = "bottom";
                }

                if(x === 0 && y !== 0 && y !== this.roomTiles.length-1){
                    this.roomTiles[y][x].placement = "left";
                }else if(x === this.roomTiles[y].length-1 && y !== 0 && y !== this.roomTiles.length-1){
                    this.roomTiles[y][x].placement = "right";
                }


            }
        }
        this.alreadyFilled = true;
    }

    addEntity(entity){
        this.containedEntites.push(entity);
    }

    addEntityToObject(object){
        this.containedEntites.forEach(value => {
            object.addGameObject(value);
        })
    }

    /**
     *
     * @param directions
     * @param room
     */
    addConnection(directions, room, call = true){
        this.numberConnections++;
        this.connectedRooms[directions] = room;
        if(call){
            room.addConnection(Room.oppositeDirections[directions],this,false);
        }
    }

    removeGarbage(){
        let activeGameObjects = this.containedEntites.filter(gameObject => gameObject.isActive);
        for(let i = 0; i < activeGameObjects.length; i++){
            activeGameObjects.gameObjectIndex = i;
        }
        this.containedEntites = activeGameObjects;
    }
}