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

    $("#carrinho").click(function () {
        $("#main").load("carrinho.php");
    });

    $.getJSON('json/products.json', function(products) {
        for(let i = 0; i < products.length; i++) {
            let button = "#button" + i.toString();
            let button2 = "button" + i.toString();

            $(button).click(function () {
                alert("Adicionado ao carrinho! (" + button + ")");
                $("#main").load("carrinho.php", {"id": button2});
            });
        }
    });    
});