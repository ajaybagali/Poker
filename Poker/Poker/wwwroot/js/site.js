// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$("#gameIdInput").keyup(update_link);

function update_link() {
    var game_id = document.getElementById("gameIdInput").value;
    var button = document.getElementById("joinbox");
    var url = "/Games/Join/" + game_id.toString();
    button.href = url;
}