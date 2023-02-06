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
        $("#main").load("php/carrinho.php");
    });

    // $.getJSON('json/products.json', function(jd) {
    //     for(let i = 0; i < jd.length; i++) {
    //         let button = "#button" + jd.toString();

    //         $(button).click(function () {
    //             alert("Adicionado ao carrinho!");
    //         });
    //     }
    // });

    // for(let i = 0; i < product.length; i++) {
    //     let button = "#button" + i.toString();

    //     $(button).click(function () {
    //         alert("Adicionado ao carrinho!");
    //     });
    // }
});