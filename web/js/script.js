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
                    alertify.success("Adicionado com sucesso!");
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
        <form action="javascript:loadLogin()" method="post">
            <label>E-mail:</label>
            <input type="email" id="email" required><br><br>
            <label>Senha:</label>
            <input type="password" id="password" required><br><br>
            <input type="submit" id="login" value="Entrar"><br><br>
            <input type="button" id="cadastro" value="Fazer cadastro" onclick="displayLogup()">
        </form>
    `;

    main.appendChild(loginForm);
}

const displayLogup = async () => {
    main.innerHTML = "";
    text.innerHTML = "";

    const logupForm = document.createElement("div");
    logupForm.style.cursor = "auto";
    logupForm.style.userSelect = "text";

    logupForm.innerHTML = `
        <form action="javascript:loadLogup()" method="post">
            <label>Nome:</label>
            <input type="text" id="name" requred><br><br>
            <label>E-mail:</label>
            <input type="email" id="email" required><br><br>
            <label>Senha:</label>
            <input type="password" id="password" required><br><br>
            <input type="submit" id="cadastro" value="Cadastrar">
        </form>
    `;

    main.appendChild(logupForm);
}

const loadLogin = async () => {
    const email = $("#email").val();
    const password = $("#password").val();

    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: {
            email: email,
            password: password
        },
        success: function(data) {
            alertify.success("Logado com sucesso!");
            loadProducts();
        },
        error: function(request, status, error) {
            console.error(request, status, error);
        }
    });
}

const loadLogup = async () => {
    const nome = $("#nome").val();
    const email = $("#email").val();
    const password = $("#password").val();

    $.ajax({
        type: "POST",
        url: "php/cadastro.php",
        data: {
            nome: nome,
            email: email,
            password: password
        },
        success: function(data) {
            alertify.success("Cadastrado com sucesso!");
            loadProducts();
        },
        error: function(request, status, error) {
            console.error(request, status, error);
        }
    });
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