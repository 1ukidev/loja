// Made by 1ukidev aka Leozinho

// Main
const main = document.getElementById("main");
const text = document.getElementById("text");
let products;

const loadProducts = async () => {
    fetch("json/products.json")
        .then(res => res.json())
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(error => {
            console.error("Erro ao carregar os produtos: ", error);
        });
}

const displayProducts = async (category = null) => {
    main.innerHTML = "";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const filteredProducts = category ? products.filter(product => product.category === category) : products;

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.setAttribute("product-id", product.id);

        if (category == null) {
            text.innerHTML = `<h1>Principais produtos:</h1>`;
        } else {
            text.innerHTML = `<h1>Principais produtos em ${product.category}:</h1>`;
        }

        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;

        productCard.addEventListener("click", function () {
            alertify.confirm("Deseja adicionar ao carrinho?", function (e) {
                if(e) {
                    cart.push(product);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    displayCart(cart);
                }
            }).set({title:"ㅤ"})
              .set({labels: {ok: "Sim", cancel: "Não"}})
              .setting("modal", false)
        });

        const carrinho = document.getElementById("carrinho");
        carrinho.addEventListener("click", function () {
            displayCart(cart);
        });

        main.appendChild(productCard);
    });
}

loadProducts();

const displayCart = async (cart) => {
    main.innerHTML = "";
    text.innerHTML = "<h1>Carrinho:</h1>";

    if (cart.length == 0) {
        const productCard = document.createElement("div");
        productCard.style.cursor = "auto";
        productCard.style.userSelect = "text";

        productCard.innerHTML = `
            <h3>O carrinho está vazio</h3>
        `;

        main.appendChild(productCard);
    } else {
        cart.forEach(product => {
            const productCard = document.createElement("div");
            productCard.style.cursor = "auto";
            productCard.style.userSelect = "text";

            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;

            main.appendChild(productCard);
        });
    }
}

const displayLogin = async () => {
    main.innerHTML = "";
    text.innerHTML = "";

    const loginForm = document.createElement("div");
    loginForm.style.cursor = "auto";
    loginForm.style.userSelect = "text";

    loginForm.innerHTML = `
        <form action="javascript:enviarLogin();" method="post">
            <input type="submit" id="login" value="Login"><br><br>
        </form>

        <form action="javascript:enviarCadastro();" method="post">
            <input type="submit" id="cadastro" value="Cadastrar">
        </form>
    `;

    main.appendChild(loginForm);
}

const enviarLogin = async () => {
    alert("Login enviado com sucesso!");
}

const enviarCadastro = async () => {
    alert("Cadastro enviado com sucesso!");
}

// Others
const enableDarkMode = async () => {
    const body = document.body;

    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }

    if (text.classList.contains("light-mode")) {
        text.classList.remove("light-mode");
        text.classList.add("dark-mode");
    } else {
        text.classList.remove("dark-mode");
        text.classList.add("light-mode");
    }
}

const limpar = async () => {
    localStorage.clear();
}