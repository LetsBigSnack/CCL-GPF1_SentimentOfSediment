class ShootingEnemy extends Enemy {

    shootCooldownFrames = 45;
    shootCurrentFrame  = 0;

    shootingRange = 250;

    speed = 1.5;

    update() {
        if(gameManager.framesInRoom >= gameManager.catchUpFrames){
            if(this.health <= 0){

                this.isActive = false;
                this.spawnItem();
            }else{
                if(this.knockback) {
                    this.moveBy.x = 0;
                    this.moveBy.y = 0;
                    this.knockBack();
                }
                this.behaviour();
            }

            this.position.x += this.moveBy.x * this.speed;
            this.position.y += this.moveBy.y * this.speed;

        }
    }

    behaviour(){

        let divX = skeleton.position.x - this.position.x;
        let divY = skeleton.position.y - this.position.y;

        let hypotenuse = Math.sqrt(Math.abs(divX)**2 + Math.abs(divY)**2);

        let directionX = divX / hypotenuse;
        let directionY = divY / hypotenuse;

        if(!this.knockback){
            if(hypotenuse <= this.shootingRange){
                this.moveBy.x = 0;
                this.moveBy.y = 0;

            }else{
                this.moveBy.x = directionX;
                this.moveBy.y = directionY;
            }
        }
        if(this.shootCurrentFrame >= this.shootCooldownFrames){


            let bullet = new Bullet("bullet", this.position.x+this.dimensions.width/2-8, this.position.y+this.dimensions.height/2-8, 16,16,directionX, directionY);
            gameManager.addGameObject(bullet);

            this.shootCurrentFrame = 0;
        }else{
            this.shootCurrentFrame++;
        }
    }


}