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
 * sets up new pixi application and draws the game
 */
var app = null;

/**
 *  Create PIXI stage
 *  @param {int} width  - how wide the stage
 *  @param {int} height - how high the stage
 *  @param {int} bg_color - background color of the stage
 *
 */
function setup_pixi_stage(width, height, bg_color)
{
    app = new PIXI.Application({  backgroundColor: bg_color });
    app.renderer.resize(width, height);
    $("#game_background").append(app.view);
}
