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

     pot_exists; 

    constructor() {

    this.pot_exists = false;

    }

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

        const dice_image = PIXI.Sprite.from('/lib/decorations.png');
        dice_image.x = 1410;
        dice_image.y = 590;
        dice_image.scale.x = .25;
        dice_image.scale.y = .25;
        app.stage.addChild(dice_image);

        const pot_image = PIXI.Sprite.from('/lib/pot1.png');
        pot_image.x = 600;
        pot_image.y = 380;
        pot_image.scale.x = .25;
        pot_image.scale.y = .25;
        app.stage.addChild(pot_image);

        //gold box
        const pot = new PIXI.Graphics();
        pot.beginFill(0xFFD700);
        pot.drawRect(760, 430, 100, 40);
        pot.endFill();
        app.stage.addChild(pot);

        //gold pot text
        let pot_text = new PIXI.Text('POT', { fill: "0xFFD700"});
        pot_text.x = 780;
        pot_text.y = 400;
        pot_text.style.fontSize = 20;
        app.stage.addChild(pot_text);
    }


    draw_river_cards(river1, river2, river3, river4, river5)
    {
        const r1 = PIXI.Sprite.from(card_images[river1]);
        r1.x = 550;
        r1.y = 270;
        r1.scale.x = .1;
        r1.scale.y = .1;
        app.stage.addChild(r1);

        const r2 = PIXI.Sprite.from(card_images[river2]);
        r2.x = 650;
        r2.y = 270;
        r2.scale.x = .1;
        r2.scale.y = .1;
        app.stage.addChild(r2);


        const r3 = PIXI.Sprite.from(card_images[river3]);
        r3.x = 750;
        r3.y = 270;
        r3.scale.x = .1;
        r3.scale.y = .1;
        app.stage.addChild(r3);


        var r4;
        //next turn river cards
        if (river4 != -1) { r4 = PIXI.Sprite.from(card_images[river4])}
        else { r4 = PIXI.Sprite.from(card_images[52]); }
        r4.x = 850;
        r4.y = 270;
        r4.scale.x = .1;
        r4.scale.y = .1;
        app.stage.addChild(r4);


        var r5;
        //next turn river cards
        if (river5 != -1) { r5 = PIXI.Sprite.from(card_images[river5]) }
        else { r5 = PIXI.Sprite.from(card_images[52]); }
        r5.x = 950;
        r5.y = 270;
        r5.scale.x = .1;
        r5.scale.y = .1;
        app.stage.addChild(r5);

    }

    draw_pot(potVal)
    {
        if (this.pot_exists) {
            app.stage.removeChild(potAmount);
        }
 
        let potAmount = new PIXI.Text('$' + potVal);
        potAmount.x = 770;
        potAmount.y = 445;
        potAmount.style.fontSize = 20;
        app.stage.addChild(potAmount);

        this.pot_exists = true;
    }


    draw_players(players) {

        var counter = 0;

        players.forEach(element => {
            if (element.order == 0) {
            
                var  username = element.username.split('@')[0];
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffcccb);
                bubble.lineStyle(3, 0xff0000);
                bubble.drawCircle(750, 620, 75);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 730;
                playername.y = 600;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 720;
                playerchips.y = 640;
                app.stage.addChild(playerchips);

                const card1 = PIXI.Sprite.from(card_images[element.card1]);
                card1.x = 845;               
                card1.y = 560;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 925;
                card2.y = 560;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

                counter++;
            }
            else if (element.order == 1) {
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
                card1.x = 160;
                card1.y = 150;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 240;
                card2.y = 150;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

                counter++;

            }
            else if (element.order == 2) {
                var username = element.username.split('@')[0];
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffcccb);
                bubble.lineStyle(3, 0xff0000);
                bubble.drawCircle(750, 100, 75);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 720;
                playername.y = 60;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 710;
                playerchips.y = 100;
                app.stage.addChild(playerchips);

                const card1 = PIXI.Sprite.from(card_images[element.card1]);
                card1.x = 850;
                card1.y = 65;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 930;
                card2.y = 65;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

                counter++;
            }
            else {
                var username = element.username.split('@')[0];
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffcccb);
                bubble.lineStyle(3, 0xff0000);
                bubble.drawCircle(1450, 300, 75);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 1430;
                playername.y = 270;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 1420;
                playerchips.y = 310;
                app.stage.addChild(playerchips);

                const card1 = PIXI.Sprite.from(card_images[element.card1]);
                card1.x = 1220;
                card1.y = 150;
                card1.scale.x = .1;
                card1.scale.y = .1;
                app.stage.addChild(card1);

                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 1300;
                card2.y = 150;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

            }
            
        });

    }
}