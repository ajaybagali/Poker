
/**
 * Author: H. James de St. Germain
 * Date: Fall 2019
 * Copyright 2019 - Not for use in class projects. Only for explanation and learning purposes.
 *
 *
 * Create a clickable button.  This base class can be extended for
 * additional functionality.
 *
 * Info:
 *   - size:      100 pixels by 50 pixels
 *   - corners:   15 pixel rounded edges
 *   - scale:     Scale as needed.
 *   - centered:  Button is centered on the sprites 0,0
 *
 */
class Button extends PIXI.Graphics {

    // action to take when clicked. 
    event_handler = null;

    /**
     * Build a Button
     *
     * handler       - function to execute upon click
     * bg_color      - background color
     * outline_color - outline on button
     * text          - optional string on button
     */
    constructor({ handler = null, bg_color = 0xffffff, outline_color = 0x000000, text = null}) {
        super();


        this.interactive = true;
        this.buttonMode = true;

        this.bg_color = bg_color;
        this.outline_color = outline_color;
        this.event_handler = handler;

        this.on('pointerup', this.button_click);

        this.draw_self();

        if (text !== null) {
            this.add_text(text);
        }
    }

    //constructor({ handler = null, type = null })
    //{
    //    this, this.event_handler = handler;
    //    //up button
    //    if (type == 1) {

    //    }
    //    //down button
    //    else {

    //    }

    //}

    /**
     * Replace the event handling function with the new function.
     * 
     * @param {func} func - changes the event listener to the new function
     */
    replace_function(func) {
        button.removeAllListeners();
        button.on('pointerup', func);
    }

    /**
     * handle a click on the checker (makes it start falling)
     */
    button_click() {
        if (this.event_handler !== null) {
            this.event_handler();
        }
    }

    /**
     * Code to draw the button
     */
    draw_self() {
        this.clear();
        this.beginFill(this.bg_color);
        this.lineStyle(4, this.outline_color);
        this.drawRoundedRect(-50, 0, 100, 50, 15);
        this.endFill();
    }

    /**
     * Place a Text Message centered on the button
     * 
     * @param {string} text - the button's text.
     */
    add_text(text) {
        let text_sprite = new PIXI.Text(text);
        text_sprite.x = -text_sprite.width / 2;
        text_sprite.y = text_sprite.height / 2 - 5;
        this.addChild(text_sprite);
    }


}


