class MiniMap extends GameObject {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);

    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.globalAlpha = 0.6;
        gameManager.canvas.drawLayer.fillStyle = "#000000";
        gameManager.canvas.drawLayer.strokeStyle = "#000000";
        gameManager.canvas.drawLayer.rect(this.position.x , this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.stroke();
        gameManager.canvas.drawLayer.globalAlpha = 1;
        gameManager.canvas.drawLayer.closePath();

        let rooms = new Set();
        let displayedRooms = new Set();

        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                gameManager.canvas.drawLayer.beginPath();
                gameManager.canvas.drawLayer.globalAlpha = 0.8;
                let test_x = ((5-j)-3);
                let test_y = ((5-i)-3);

                let room = gameManager.rooms.filter(room => room.x_pos === gameManager.currentRoom.x_pos+ (3-(5-j)) &&  room.y_pos === gameManager.currentRoom.y_pos+((5-i)-3))[0];
                if(room){

                    if(room === gameManager.currentRoom){
                        rooms.add(room);

                        gameManager.canvas.drawLayer.fillStyle = "#dddddd";
                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                        gameManager.canvas.drawLayer.rect(this.position.x + j*25, this.position.y + i*25, 25, 25);
                    }
                    else if(room.visited){
                        rooms.add(room);
                        gameManager.canvas.drawLayer.fillStyle = "#555555";
                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                        gameManager.canvas.drawLayer.rect(this.position.x + j*25, this.position.y + i*25, 25, 25);
                    }

                }

                gameManager.canvas.drawLayer.fill();
                gameManager.canvas.drawLayer.stroke();
                gameManager.canvas.drawLayer.globalAlpha = 1;
                gameManager.canvas.drawLayer.closePath();
            }
        }

        rooms.forEach(value => {
            displayedRooms.add(value);

        })


        for(let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                gameManager.canvas.drawLayer.beginPath();
                gameManager.canvas.drawLayer.globalAlpha = 0.8;


                let room = gameManager.rooms.filter(room => room.x_pos === gameManager.currentRoom.x_pos + (3 - (5 - j)) && room.y_pos === gameManager.currentRoom.y_pos + ((5 - i) - 3))[0];
                if (room) {
                    if (!(room === gameManager.currentRoom) && !room.visited) {
                        rooms.forEach(value => {
                            for (const [key_2, value_2] of Object.entries(Room.generatorDirections)) {
                                let test_x = value.x_pos + value_2[0];
                                let test_y = value.y_pos + value_2[1]
                                let adjecentRoom = gameManager.rooms.filter(room => room.x_pos === value.x_pos + value_2[0] && room.y_pos === value.y_pos + value_2[1])[0];
                                if (adjecentRoom === room) {
                                    displayedRooms.add(room);
                                    gameManager.canvas.drawLayer.fillStyle = "#222222";
                                    gameManager.canvas.drawLayer.strokeStyle = "#000000";
                                    gameManager.canvas.drawLayer.rect(this.position.x + j * 25, this.position.y + i * 25, 25, 25);
                                }
                            }
                        });
                    }

                }
                gameManager.canvas.drawLayer.fill();
                gameManager.canvas.drawLayer.stroke();
                gameManager.canvas.drawLayer.globalAlpha = 1;
                gameManager.canvas.drawLayer.closePath();

            }

        }

        for(let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                gameManager.canvas.drawLayer.beginPath();
                gameManager.canvas.drawLayer.globalAlpha = 0.8;


                let room = gameManager.rooms.filter(room => room.x_pos === gameManager.currentRoom.x_pos + (3 - (5 - j)) && room.y_pos === gameManager.currentRoom.y_pos + ((5 - i) - 3))[0];
                if (room) {
                    if (true) {
                        displayedRooms.forEach(value => {
                            let adjecentRoom = gameManager.rooms.filter(room => room.x_pos === value.x_pos && room.y_pos === value.y_pos)[0];
                            if (adjecentRoom === room) {
                                switch (adjecentRoom.type) {
                                    case Room.roomTypes.Boss:
                                        gameManager.canvas.drawLayer.fillStyle = "red";
                                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                                        gameManager.canvas.drawLayer.rect(this.position.x + j * 25, this.position.y + i * 25, 25, 25);
                                        break;
                                    case Room.roomTypes.Item:
                                        gameManager.canvas.drawLayer.fillStyle = "yellow";
                                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                                        gameManager.canvas.drawLayer.rect(this.position.x + j * 25, this.position.y + i * 25, 25, 25);
                                        break;
                                    case Room.roomTypes.Shop:
                                        gameManager.canvas.drawLayer.fillStyle = "green";
                                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                                        gameManager.canvas.drawLayer.rect(this.position.x + j * 25, this.position.y + i * 25, 25, 25);
                                        break;
                                }
                            }
                        });
                    }

                }
                gameManager.canvas.drawLayer.fill();
                gameManager.canvas.drawLayer.stroke();
                gameManager.canvas.drawLayer.globalAlpha = 1;
                gameManager.canvas.drawLayer.closePath();

            }

        }



    }


}