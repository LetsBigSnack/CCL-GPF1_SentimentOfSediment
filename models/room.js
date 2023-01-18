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
        for (let y = 0; y < this.roomTiles.length; y++){
            for (let x = 0; x < this.roomTiles[y].length; x++){
                if(y === 0 || y === this.roomTiles.length-1){
                    if(y === 0 && (x === 5 || x === 6)){
                        if( this.connectedRooms["n"] ){
                            this.roomTiles[y][x] =   new Door("n", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y);
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }

                    if(y === this.roomTiles.length-1 && (x === 5 || x === 6)){
                        if( this.connectedRooms["s"]){
                            this.roomTiles[y][x] =   new Door("s", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y);
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }

                    this.roomTiles[y][x] =   new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y);
                    this.containedEntites.push(this.roomTiles[y][x]);

                }else if(x === 0 || x === this.roomTiles[y].length-1){


                    if(x === 0 && (y === 3 || y === 4)){
                        if( this.connectedRooms["w"] ){
                            this.roomTiles[y][x] =   new Door("w", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y);
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }

                    if(x === this.roomTiles[y].length-1 && (y === 3 || y === 4)){
                        if( this.connectedRooms["e"]){
                            this.roomTiles[y][x] =   new Door("e", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y);
                            this.containedEntites.push(this.roomTiles[y][x]);
                            continue;
                        }
                    }

                    this.roomTiles[y][x] =   new Wall("obstacle", x * this.tileDimensions.x , y * this.tileDimensions.y, this.tileDimensions.x, this.tileDimensions.y);
                    this.containedEntites.push(this.roomTiles[y][x]);

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
}