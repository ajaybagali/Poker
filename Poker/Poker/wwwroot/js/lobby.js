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
 *    Displays new users that joined the lobby and redirects to specified poker game
 */
$("#testbutton").click(placeBet);

function worker() {
    data = { id: document.getElementById("gameid").textContent };
    $.post('/Games/Data', data)
        .done(function (result) {
            if (result.turn != -1) {
                window.location.replace("../Play/" + result.id)
            }
            $("#gameresponse")[0].innerHTML = '';
            result.players.forEach(element => { 
                $("#gameresponse").append(`<li class="list-group-item">${element.username}</li>`);
            });

             setTimeout(worker, 1000);
        });
}


window.onload = function () {
    setTimeout(worker, 1000);
};

function placeBet() {
    data = { id: document.getElementById("gameid").textContent, amount: 200 };
    $.post('/Games/Bet', data);
}