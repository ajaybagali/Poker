/**
 * Author:    Ajay Bagali, Jon England, Ryan Furukawa
 * Date:      12/7/2020
 * Course:    CS 4540, University of Utah, School of Computing
 * Copyright: CS 4540 and Ajay Bagali, Jon England, Ryan Furukawa - This work may not be copied for use in Academic Coursework.
 *
 * I, Ajay Bagali, Jon England, and Ryan Furukawa, certify that I wrote this code from scratch and did
 * not copy it in part or whole from another source.  Any references used
 * in the completion of the assignment are cited in my README file and in
 * the appropriate method header.
 *
 * File Contents
 *
 *    draws green gameboard
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
        this.drawRect(5, 5, 1000, 780);
        this.endFill();
    }
}





