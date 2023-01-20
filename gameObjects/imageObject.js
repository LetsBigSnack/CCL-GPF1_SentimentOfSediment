/**
 * This Class inherits from the GameObject-Class
 * It adds the ability to draw / animation sprites for the GameObject
 */
class ImageObject extends GameObject {
    image;
    animations = {};
    columns = 0;
    rows = 0;
    currentSourceX = 0;
    currentSourceY = 0;
    currentStartFrame = 0;
    currentEndFrame = 0;
    currentAnimationFrame = 0;
    isLoaded = false;
    animationDurationPerFrame = 5;
    currentAnimationFrameDuration = 0;

    /**
     *
     * The class constructor for the class "ImageObject"
     * @param{string} name The name of the GameObject
     * @param{number} x The initial position on the X-axis
     * @param{number} y The initial position on the Y-axis
     * @param{number} width The width of the GameObject
     * @param{number} height the height of the GameObject
     * @param src{string} The path to the Image for the ImageObject
     */
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height);
        this.image = new Image();
        this.image.src = src;
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
            this.columns = this.image.naturalWidth / this.dimensions.width;
            this.rows = this.image.naturalHeight / this.dimensions.height;
        });    
    }


    draw() {
        if (this.isLoaded) {
            this.changeFrameOfCurrentAnimation();
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(this.image, this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.canvas.drawLayer.closePath();
        }
    }


    /**
     * Changes the current Frame of the animation
     */
    changeFrameOfCurrentAnimation() {
        this.currentAnimationFrameDuration++;
        if (this.currentAnimationFrameDuration < this.animationDurationPerFrame) {
            return;
        }
        this.currentAnimationFrameDuration = 0;
        if (this.currentAnimationFrame > this.currentEndFrame) {
            this.currentAnimationFrame = this.currentStartFrame;
        }
        let currentRow = Math.floor(this.currentAnimationFrame / this.columns);
        let currentColumn = this.currentAnimationFrame % this.columns;
        this.currentSourceY = currentRow * this.dimensions.height;
        this.currentSourceX = currentColumn * this.dimensions.width;
        this.currentAnimationFrame++;
    }

    /**
     * Adds a new animation to the current ImageObject
     * @param{string} name The name of the new animation
     * @param{number} startFrame The first Frame of the animation, on the SpriteSheet
     * @param{number} endFrame The first Frame of the animation, on the SpriteSheet
     */
    addAnimationInformation(name, startFrame, endFrame) {
        this.animations[name] = {
            "startFrame": startFrame,
            "endFrame": endFrame
        };
    }

    /**
     * Sets the current Animation based on a given name
     * @param name The name of the Animation, which will be set
     */
    setCurrentAnimationByName(name) {
        this.currentStartFrame = this.animations[name].startFrame;
        this.currentEndFrame = this.animations[name].endFrame;
        this.currentAnimationFrame = this.animations[name].startFrame;
    } 
}