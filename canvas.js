/**
 * This Class is used to represent the "Canvas" entities in the game.
 * This Canvas class stores the actual HTML-Canvas.
 * It sets itself as the Canvas for the GameManager on creation
 *
 */
class Canvas {

    /**
     * The class constructor for the class "Canvas"
     * @param{string} canvasId The ID of the HTML-Canvas element
     */
    constructor(canvasId) {
        this.canvasHTMLElement = document.getElementById(canvasId);
        this.drawLayer = this.canvasHTMLElement.getContext("2d");
        this.canvasBoundaries = {
            bottom: this.canvasHTMLElement.height,
            right: this.canvasHTMLElement.width,
            left: 0,
            top: 0
        };
        gameManager.setCanvas(this);
    }

    /**
     * Clears the Canvas
     */
    clearScreen(){
         this.drawLayer.clearRect(0, 0, this.canvasHTMLElement.width, this.canvasHTMLElement.height);
     }
    
}