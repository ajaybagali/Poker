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

var card_images =
{
    0 : '/lib/PNG/AH.png',
    1 : '/lib/PNG/AD.png',
    2 : '/lib/PNG/AS.png',
    3 : '/lib/PNG/AC.png',
    4 : '/lib/PNG/2H.png',
    5  : '/lib/PNG/2D.png',
    6  : '/lib/PNG/2S.png',
    7  : '/lib/PNG/2C.png',
    8 : '/lib/PNG/3H.png',
    9 : '/lib/PNG/3D.png',
    10 : '/lib/PNG/3S.png',
    11  : '/lib/PNG/3C.png',
    12  : '/lib/PNG/4H.png',
    13  : '/lib/PNG/4D.png',
    14  : '/lib/PNG/4S.png',
    15  : '/lib/PNG/4C.png',
    16  : '/lib/PNG/5H.png',
    17  : '/lib/PNG/5D.png',
    18 : '/lib/PNG/5S.png',
    19  : '/lib/PNG/5C.png',
    20   : '/lib/PNG/6H.png',
    21  : '/lib/PNG/6D.png',
    22  : '/lib/PNG/6S.png',
    23  : '/lib/PNG/6C.png',
    24   : '/lib/PNG/7H.png',
    25 : '/lib/PNG/7D.png',
    26  : '/lib/PNG/7S.png',
    27   : '/lib/PNG/7C.png',
    28   : '/lib/PNG/8H.png',
    29   : '/lib/PNG/8D.png',
    30   : '/lib/PNG/8S.png',
    31   : '/lib/PNG/8C.png',
    32   : '/lib/PNG/9H.png',
    33   : '/lib/PNG/9D.png',
    34   : '/lib/PNG/9S.png',
    35   : '/lib/PNG/9C.png',
    36   : '/lib/PNG/10H.png',
    37   : '/lib/PNG/10D.png',
    38  : '/lib/PNG/10S.png',
    39   : '/lib/PNG/10C.png',
    40   : '/lib/PNG/JH.png',
    41  : '/lib/PNG/JD.png',
    42  : '/lib/PNG/JS.png',
    43  : '/lib/PNG/JC.png',
    44  : '/lib/PNG/QH.png',
    45  : '/lib/PNG/QD.png',
    46  : '/lib/PNG/QS.png',
    47   : '/lib/PNG/QC.png',
    48  : '/lib/PNG/KH.png',
    49   : '/lib/PNG/KD.png',
    50  : '/lib/PNG/KS.png',
    51 : '/lib/PNG/KC.png',
};

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
        setup_pixi_stage(1580, 830, 0xFFFFFF);
        app.stage.addChild(new Game_Board());

        this.add_game_buttons();
    }

    add_game_buttons() {
        this.add_fold_button();
        this.add_call_button();
        this.add_bet_button();
    }

    add_fold_button() {
        let fold_button = new Button({
            bg_color: 0xFFFFFF,
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
            bg_color: 0xFFFFFF,
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
            bg_color: 0xFFFFFF,
            outline_color: 0x000000,
            text: "Bet"
        });

        bet_button.scale.x = 1.2;
        bet_button.scale.y = 1.2;
        bet_button.x = 850;
        bet_button.y = 740;

        app.stage.addChild(bet_button);

    }

    draw_pot(potVal)
    {
        // draw big green rectangle
        
        const pot = new PIXI.Graphics();
        pot.beginFill(0xffffff);
        pot.drawRect(750, 400, 150, 75);
        pot.endFill();
        app.stage.addChild(pot);

        let potAmount = new PIXI.Text(potVal);
        potAmount.x = 850;
        potAmount.y = 450;
        potAmount.style.fontSize = 20;
        app.stage.addChild(potAmount);
    }

    draw_players(players) {

        var counter = 0;

        players.forEach(element => {
            if (counter == 0) {
                var  username = element.username;
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffffff);
                bubble.drawCircle(750, 650, 90);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 650;
                playername.y = 650;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 650;
                playerchips.y = 700;
                app.stage.addChild(playerchips);

                const image = PIXI.Sprite.from(card_images[element.card1]);
                image.x = 845;               
                image.y = 560;
                image.scale.x = .1;
                image.scale.y = .1;
                app.stage.addChild(image);


                const card2 = PIXI.Sprite.from(card_images[element.card2]);
                card2.x = 950;
                card2.y = 560;
                card2.scale.x = .1;
                card2.scale.y = .1;
                app.stage.addChild(card2);

                counter++;
            }
            else if (counter == 1) {
                var username = element.username;
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffffff);
                bubble.drawCircle(100, 300, 90);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 125;
                playername.y = 270;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 170;
                playerchips.y = 320;
                app.stage.addChild(playerchips);

                counter++;

            }
            else if (counter == 2) {
                var username = element.username;
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffffff);
                bubble.drawCircle(750, 100, 90);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 700;
                playername.y = 100;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 700;
                playerchips.y = 150;
                app.stage.addChild(playerchips);

                counter++;
            }
            else {
                var username = element.username;
                var chips = element.chips;

                const bubble = new PIXI.Graphics();
                bubble.beginFill(0xffffff);
                bubble.drawCircle(1350, 300, 90);
                bubble.endFill();
                app.stage.addChild(bubble);

                let playername = new PIXI.Text(username);
                playername.x = 1350;
                playername.y = 300;
                playername.style.fontSize = 20;
                app.stage.addChild(playername);

                let playerchips = new PIXI.Text('$' + chips);
                playerchips.x = 1400;
                playerchips.y = 350;
                app.stage.addChild(playerchips);

                counter++;
            }
            
        });

    }





    // worker() {
    //    data = { id: document.getElementById("gameid").textContent };
    //    $.post('/Games/Data', data)
    //        .done(function (result) {
    //            if (result.turn != -1) {
    //                window.location.replace("../Play/" + result.id)
    //            }

    //            //While(stage.children[0]) { stage.removeChild(stage.children[0]); }


    //            setTimeout(worker, 1000);
    //        });
    //}



}

//window.onload = function () {
//    setTimeout(worker, 1000);
//};