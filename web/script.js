$(document).ready(function () {
    $("#brinquedos").click(function () {
        $("#main").load("php/brinquedos.php");
    });

    $("#roupas").click(function () {
        $("#main").load("php/roupas.php");
    });

    $("#enxoval").click(function () {
        $("#main").load("php/enxoval.php");
    });

    $("#higiene").click(function () {
        $("#main").load("php/higiene.php");
    });

    $("#saude").click(function () {
        $("#main").load("php/saude.php");
    });
});

document.getElementById('main').addEventListener('click', function(event) {
    if (event.target.classList.contains('product')) {
        event.preventDefault();
        alert("Adicionado ao carrinho!");
    }
});