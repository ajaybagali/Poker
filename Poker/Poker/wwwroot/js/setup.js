/**
 * Initialize the WebCanvas Pixi Stage
 *
 * Author: H. James de St. Germain
 * Date: Fall 2019
 *
 */

/**
 * Global Variable - access to the PIXI Application
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
