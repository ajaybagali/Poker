/**
 * Initialize the WebCanvas Pixi Stage
 *
 * Author: Ajay Bagali
 * Date: Fall 2020
 *
 */

/**
 * Global Variable - access to the PIXI Application
 */
class Game {

    constructor() {

    }

    /**
    * Main startup function
    *
    *  1) Build the Pixi UI
    *
    */
    main() {
      
        //white game screen
        setup_pixi_stage(1010, 790, 0xFFFFFF);

        
        app.stage.addChild(new Game_Board());

        const dice_image = PIXI.Sprite.from('/lib/decorations.png');
        dice_image.x = 860;
        dice_image.y = 675;
        dice_image.scale.x = .25;
        dice_image.scale.y = .25;
        app.stage.addChild(dice_image);

        const pot_image = PIXI.Sprite.from('/lib/pot1.png');
        pot_image.x = 385;
        pot_image.y = 380;
        pot_image.scale.x = .25;
        pot_image.scale.y = .25;
        app.stage.addChild(pot_image);
    }

    draw_message_board(action)
    {

        const message_board = new PIXI.Graphics();
        message_board.lineStyle(3, 0x301934);
        message_board.beginFill(0xD8BFD8);
        message_board.drawRect(30, 715, 600, 50);
        message_board.endFill();
        app.stage.addChild(message_board);

        let text = new PIXI.Text(action, { fill: "0x000000" });
        text.x = 40;
        text.y = 730;
        text.style.fontSize = 17;
        app.stage.addChild(text);
        

    }


    draw_river_cards(river1, river2, river3, river4, river5)
    {
        const r1 = PIXI.Sprite.from(card_images[river1]);
        r1.x = 285;
        r1.y = 270;
        r1.scale.x = .1;
        r1.scale.y = .1;
        app.stage.addChild(r1);

        const r2 = PIXI.Sprite.from(card_images[river2]);
        r2.x = 385;
        r2.y = 270;
        r2.scale.x = .1;
        r2.scale.y = .1;
        app.stage.addChild(r2);


        const r3 = PIXI.Sprite.from(card_images[river3]);
        r3.x = 485;
        r3.y = 270;
        r3.scale.x = .1;
        r3.scale.y = .1;
        app.stage.addChild(r3);


        var r4;
        //next turn river cards
        if (river4 != -1) { r4 = PIXI.Sprite.from(card_images[river4])}
        else { r4 = PIXI.Sprite.from(card_images[52]); }
        r4.x = 585;
        r4.y = 270;
        r4.scale.x = .1;
        r4.scale.y = .1;
        app.stage.addChild(r4);


        var r5;
        //next turn river cards
        if (river5 != -1) { r5 = PIXI.Sprite.from(card_images[river5]) }
        else { r5 = PIXI.Sprite.from(card_images[52]); }
        r5.x = 685;
        r5.y = 270;
        r5.scale.x = .1;
        r5.scale.y = .1;
        app.stage.addChild(r5);

    }

    draw_pot(potVal)
    {

        const pot = new PIXI.Graphics();
        pot.beginFill(0xFFD700);
        pot.drawRect(525, 430, 100, 40);
        pot.endFill();
        app.stage.addChild(pot);

        //gold pot text
        let pot_text = new PIXI.Text('POT', { fill: "0xFFD700" });
        pot_text.x = 535;
        pot_text.y = 400;
        pot_text.style.fontSize = 20;
        app.stage.addChild(pot_text);

        let potAmount = new PIXI.Text('$' + potVal);
        potAmount.x = 555;
        potAmount.y = 445;
        potAmount.style.fontSize = 20;
        app.stage.addChild(potAmount);
    }


    draw_players(players, turn) {

        var indicator1;
        var indicator2;
        var indicator3;
        var indicator4;

        players.forEach(element => {
            if (element.order == 0) {

                var username = element.username.split('@')[0];
                var chips = element.chips;

                if (element.order == turn)
                {
                    

                    //redraw over 
                    indicator2 = new PIXI.Graphics();
                    indicator2.lineStyle(3, 0x009900);
                    indicator2.drawCircle(90, 300, 80);
                    indicator2.endFill();
                    app.stage.addChild(indicator2);


                    indicator3 = new PIXI.Graphics();
                    indicator3.lineStyle(3, 0x009900);
                    indicator3.drawCircle(520, 100, 80);
                    indicator3.endFill();
                    app.stage.addChild(indicator3);


                    indicator4 = new PIXI.Graphics();
                    indicator4.lineStyle(3, 0x009900);
                    indicator4.drawCircle(900, 300, 80);
                    indicator4.endFill();
                    app.stage.addChild(indicator4);


                    indicator1 = new PIXI.Graphics();
                    indicator1.lineStyle(3, 0xffffff);
                    indicator1.drawCircle(520, 620, 80);
                    indicator1.endFill();
                    app.stage.addChild(indicator1);

                }
            

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffcccb);
                bubble.lineStyle(3, 0xff0000);
                bubble.drawCircle(520, 620, 75);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 490;
                playername.y = 600;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 480;
                playerchips.y = 640;
                app.stage.addChild(playerchips);

                const card1 = PIXI.Sprite.from(card_images[element.card1]);
                card1.x = 255;               
                card1.y = 560;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 335;
                card2.y = 560;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

            }
            else if (element.order == 1) {

                if (element.order == turn) {

                    //redraw over 
                    indicator1 = new PIXI.Graphics();
                    indicator1.lineStyle(3, 0x009900);
                    indicator1.drawCircle(520, 620, 80);
                    indicator1.endFill();
                    app.stage.addChild(indicator1);


                    indicator3 = new PIXI.Graphics();
                    indicator3.lineStyle(3, 0x009900);
                    indicator3.drawCircle(520, 100, 80);
                    indicator3.endFill();
                    app.stage.addChild(indicator3);


                    indicator4 = new PIXI.Graphics();
                    indicator4.lineStyle(3, 0x009900);
                    indicator4.drawCircle(900, 300, 80);
                    indicator4.endFill();
                    app.stage.addChild(indicator4);

                    indicator2 = new PIXI.Graphics();
                    indicator2.lineStyle(3, 0xffffff);
                    indicator2.drawCircle(90, 300, 80);
                    indicator2.endFill();
                    app.stage.addChild(indicator2);

                }
                var username = element.username.split('@')[0];
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffcccb);
                bubble.lineStyle(3, 0xff0000);
                bubble.drawCircle(90, 300, 75);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 60;
                playername.y = 270;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 60;
                playerchips.y = 310;
                app.stage.addChild(playerchips);

                const card1 = PIXI.Sprite.from(card_images[element.card1]);
                card1.x = 30;
                card1.y = 100;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 110;
                card2.y = 100;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);


            }
            else if (element.order == 2) {

                if (element.order == turn) {

                    //redraw over 
                    indicator2 = new PIXI.Graphics();
                    indicator2.lineStyle(3, 0x009900);
                    indicator2.drawCircle(90, 300, 80);
                    indicator2.endFill();
                    app.stage.addChild(indicator2);


                    indicator1 = new PIXI.Graphics();
                    indicator1.lineStyle(3, 0x009900);
                    indicator1.drawCircle(520, 620, 80);
                    indicator1.endFill();
                    app.stage.addChild(indicator1);


                    indicator4 = new PIXI.Graphics();
                    indicator4.lineStyle(3, 0x009900);
                    indicator4.drawCircle(900, 300, 80);
                    indicator4.endFill();
                    app.stage.addChild(indicator4);

                    indicator3 = new PIXI.Graphics();
                    indicator3.lineStyle(3, 0xffffff);
                    indicator3.drawCircle(520, 100, 80);
                    indicator3.endFill();
                    app.stage.addChild(indicator3);

                }

                var username = element.username.split('@')[0];
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffcccb);
                bubble.lineStyle(3, 0xff0000);
                bubble.drawCircle(520, 100, 75);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 490;
                playername.y = 60;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 480;
                playerchips.y = 100;
                app.stage.addChild(playerchips);

                const card1 = PIXI.Sprite.from(card_images[element.card1]);
                card1.x = 635;
                card1.y = 65;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 715;
                card2.y = 65;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

            }
            else {
                var username = element.username.split('@')[0];
                var chips = element.chips;

                if (element.order == turn) {

                    //redraw over 
                    indicator2 = new PIXI.Graphics();
                    indicator2.lineStyle(3, 0x009900);
                    indicator2.drawCircle(90, 300, 80);
                    indicator2.endFill();
                    app.stage.addChild(indicator2);


                    indicator3 = new PIXI.Graphics();
                    indicator3.lineStyle(3, 0x009900);
                    indicator3.drawCircle(520, 100, 80);
                    indicator3.endFill();
                    app.stage.addChild(indicator3);


                    indicator1 = new PIXI.Graphics();
                    indicator1.lineStyle(3, 0x009900);
                    indicator1.drawCircle(520, 620, 80);
                    indicator1.endFill();
                    app.stage.addChild(indicator1);

                    indicator4 = new PIXI.Graphics();
                    indicator4.lineStyle(3, 0xffffff);
                    indicator4.drawCircle(900, 300, 80);
                    indicator4.endFill();
                    app.stage.addChild(indicator4);

                }

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffcccb);
                bubble.lineStyle(3, 0xff0000);
                bubble.drawCircle(900, 300, 75);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 870;
                playername.y = 270;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 860;
                playerchips.y = 310;
                app.stage.addChild(playerchips);

                const card1 = PIXI.Sprite.from(card_images[element.card1]);
                card1.x = 840;
                card1.y = 390;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 920;
                card2.y = 390;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

            }
            
        });

    }
}