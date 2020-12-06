
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
        let board_color = 0x009900;
        let board_outline_color = 0x006600;

        // draw big green rectangle
        this.lineStyle(5, board_outline_color);
        this.beginFill(board_color);
        this.drawRect(5, 5, 1540, 700);
        this.endFill();
    }

    //draw_amount_box() {
    //    let board_color = 0xFFFFFF;
    //    let board_outline_color = 0x0000000;

    //    // draw big green rectangle
    //    this.lineStyle(3, board_outline_color);
    //    this.beginFill(board_color);
    //    this.drawRect(1100, 740, 150, 60);
    //    this.endFill();
    //}
}





