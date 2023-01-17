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



        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                gameManager.canvas.drawLayer.beginPath();
                gameManager.canvas.drawLayer.globalAlpha = 0.8;
                let test_x = ((5-j)-3);
                let test_y = ((5-i)-3);

                let room = gameManager.rooms.filter(room => room.x_pos === gameManager.currentRoom.x_pos+ (3-(5-j)) &&  room.y_pos === gameManager.currentRoom.y_pos+((5-i)-3))[0];
                if(room){
                    if(room === gameManager.currentRoom){
                        gameManager.canvas.drawLayer.fillStyle = "#dddddd";
                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                    }
                    else if(room.visited){
                        gameManager.canvas.drawLayer.fillStyle = "#555555";
                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                    }else{
                        gameManager.canvas.drawLayer.fillStyle = "#222222";
                        gameManager.canvas.drawLayer.strokeStyle = "#000000";
                    }
                    gameManager.canvas.drawLayer.rect(this.position.x + j*25, this.position.y + i*25, 25, 25);
                }

                gameManager.canvas.drawLayer.fill();
                gameManager.canvas.drawLayer.stroke();
                gameManager.canvas.drawLayer.globalAlpha = 1;
                gameManager.canvas.drawLayer.closePath();
            }
        }

    }


}