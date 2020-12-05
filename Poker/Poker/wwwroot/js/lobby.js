

function worker() {
    data = { id: document.getElementById("gameid").textContent };
    $.post('/Games/Data', data)
        .done(function (result) {
            if (result.turn != -1) {
                window.location.replace("../Play/" + result.id)
            }
            $("#gameresponse")[0].innerHTML = '';
            result.players.forEach(element => { 
                $("#gameresponse").append(`<p>${element.username}</p>`);
            });
             setTimeout(worker, 1000);
        });
}


window.onload = function () {
    setTimeout(worker, 1000);
};
