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
class Game
{

    constructor() { }
/**
 *  Create PIXI stage
 *  @param {int} width  - how wide the stage
 *  @param {int} height - how high the stage
 *  @param {int} bg_color - background color of the stage
 *
 */
    setup_pixi_stage(width, height, bg_color)
    {
        var app = new PIXI.Application({ backgroundColor: bg_color });
        app.renderer.resize(width, height);
        $("#canvas_div").append(app.view);
    }
}