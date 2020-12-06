$("#testbutton").click(placeBet);

function worker() {
    data = { id: document.getElementById("gameid").textContent };
    $.post('/Games/Data', data)
        .done(function (result) {
           // if (result.turn != -1) {
           //     window.location.replace("../Play/" + result.id)
          //  }
            $("#gameresponse")[0].innerHTML = '';
            $("#gameresponse").append(`<p>river1: suit: ${result.river1 % 4} val: ${(result.river1 / 4) | 0}</p>
                        <p>river2: suit: ${result.river2 % 4} val: ${(result.river2 / 4) | 0}</p>
                        <p>river3: suit: ${result.river3 % 4} val: ${(result.river3 / 4) | 0}</p>
                        <p>river4: suit: ${result.river4 % 4} val: ${(result.river4 / 4) | 0}</p>
                        <p>river5: suit: ${result.river5 % 4} val: ${(result.river5 / 4) | 0}</p>
                        <p>winner: ${result.winner}</p>
                        <p>pot: ${result.pot}</p>
                        <p>minBet: ${result.minimumBet}</p>
                        <p>turn: ${result.turn}</p>`);
            result.players.forEach(element => { 
                $("#gameresponse").append(`<p>user: ${element.username}</p>
<p>chips: ${element.chips}</p>
<p>folded: ${element.folded}</p>
<p>card1: suit: ${element.card1 % 4} val: ${(element.card1 / 4) | 0}</p>
<p>card2: suit: ${element.card2 % 4} val: ${(element.card2 / 4) | 0}</p>
<p>current bet: ${element.currentBet}</p>`);
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