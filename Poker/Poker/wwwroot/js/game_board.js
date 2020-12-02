
/**
 * Create a Board_Overlay Object
 *
 * Author: H. James de St. Germain
 * Date: Fall 2019
 * Copyright 2019 - Not for use in class projects. Only for explanation and learning purposes.
 *
 */
class Game_Board extends PIXI.Graphics {
    /**
     * Create the connect four board
     */
    constructor() {
        super();
        this.draw_self();
    }

    /**
     * Code to draw the board
     */
    draw_self() {
        let board_color = 0x66CC00;
        let board_outline_color = 0x006400;

        // draw big green rectangle
        this.lineStyle(3, board_outline_color);
        this.beginFill(board_color);
        this.drawRect(0, 0, 1540, 700);
        this.endFill();
    }
}





