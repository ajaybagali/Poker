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
    * Main startup function
    *
    *  1) Build the Pixi UI
    *
    */
    main() {
        //white game screen
        setup_pixi_stage(1580, 830, 0xFFFFFF);
        app.stage.addChild(new Game_Board());

        this.add_game_buttons();
    }

    add_game_buttons()
    {
        this.add_fold_button();
        this.add_call_button();
        this.add_bet_button();
        

    }

    add_fold_button()
    {
        let fold_button = new Button({
            bg_color: 0xffffff,
            outline_color: 0x000000,
            text: "Fold"
        });

        fold_button.scale.x = 1.2;
        fold_button.scale.y = 1.2;
        fold_button.x = 250;
        fold_button.y = 740;

        app.stage.addChild(fold_button);

    }

    add_call_button() {
        let call_button = new Button({
            bg_color: 0xffffff,
            outline_color: 0x000000,
            text: "Call"
        });

        call_button.scale.x = 1.2;
        call_button.scale.y = 1.2;
        call_button.x = 550;
        call_button.y = 740;

        app.stage.addChild(call_button);

    }

    add_bet_button() {
        let bet_button = new Button({
            bg_color: 0xffffff,
            outline_color: 0x000000,
            text: "Bet"
        });

        bet_button.scale.x = 1.2;
        bet_button.scale.y = 1.2;
        bet_button.x = 850;
        bet_button.y = 740;

        app.stage.addChild(bet_button);

    }
}