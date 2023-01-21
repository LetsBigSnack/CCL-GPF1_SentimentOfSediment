class LevelGenerator{


    static generateLevel(minNumberOfRooms = 5, maxNumberRooms = 8 ){

        let roomList;
        let finsihedGeneration = false;

        do{

            roomList = [];
            //Starting Room
            let startingRoom = new Room(0,0);
            roomList.push(startingRoom);

            //Random
            let roomNumber = Math.random() * (maxNumberRooms - minNumberOfRooms) + minNumberOfRooms;
            let currentRoom = startingRoom;

            for (let i = 0; i < roomNumber;){

                currentRoom = roomList.filter(room => room.visitedByGenerator === false)[0];
                if(!currentRoom){
                    //reset visited Rooms
                    roomList.forEach(value => value.visitedByGenerator = false);
                }else{
                    for (const [key, value] of Object.entries(Room.generatorDirections)) {

                        //Fail Save
                        if(i >= roomNumber){
                            continue;
                        }

                        let rng = Math.random();
                        let roomRng = currentRoom.numberConnections / 4;
                        if(rng > (roomRng*1.2)){
                            if(roomList.filter(room => room.x_pos === currentRoom.x_pos+value[0] &&  room.y_pos === currentRoom.y_pos+value[1]).length < 1) {
                                let tmpRoom = new Room(currentRoom.x_pos+value[0],currentRoom.y_pos+value[1]);
                                roomList.push(tmpRoom);
                                currentRoom.addConnection(key,tmpRoom);

                                //Add Connection to connected
                                for (const [key_2, value_2] of Object.entries(Room.generatorDirections)) {
                                    let test_x = tmpRoom.x_pos+value_2[0];
                                    let test_y = tmpRoom.y_pos+value_2[1]
                                    let adjecentRoom = roomList.filter(room => room.x_pos === tmpRoom.x_pos+value_2[0] &&  room.y_pos === tmpRoom.y_pos+value_2[1])[0];

                                    if(adjecentRoom){

                                        let isAlreadyConnected = false;
                                        for (const [dir, dirRoom] of Object.entries(tmpRoom.connectedRooms)) {
                                            if(adjecentRoom === dirRoom){
                                                isAlreadyConnected = true;
                                            }
                                        }

                                        if(!isAlreadyConnected){
                                            tmpRoom.addConnection(key_2,adjecentRoom);
                                        }
                                    }
                                }

                                i++;
                            }
                        }
                    }
                    currentRoom.visitedByGenerator = true;
                }
            }
            try {
                let roomWithOneConnection = roomList.filter(room => room.numberConnections === 1 && room.x_pos !== 0 && room.y_pos !== 0);
                if(roomWithOneConnection){
                    if(roomWithOneConnection.length >= 3){
                        //TODO make less scuffed
                        for(let uniqueRooms = 0; uniqueRooms < 3; uniqueRooms++){
                            if(uniqueRooms === 2){
                                roomWithOneConnection[uniqueRooms].type = 1;
                            }else{
                                roomWithOneConnection[uniqueRooms].type = uniqueRooms+1;
                            }
                            console.log( roomWithOneConnection[uniqueRooms].type);
                        }
                        finsihedGeneration = true;
                    }
                }
            }catch (e) {

            }
        }while(!finsihedGeneration)
        //if not 2 rooms with just 1 connection regenerate
        return roomList;

    }
}