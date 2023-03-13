// Made by 1ukidev aka Leozinho

// Main
const main = document.getElementById("main");
const text = document.getElementById("text");
const others = document.getElementById("others");
let products;

const loadProducts = () => {
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

const displayProducts = (category = null) => {
    main.innerHTML = "";
    others.innerHTML = "";

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

        productCard.addEventListener("click", () => {
            alertify.confirm("Deseja adicionar ao carrinho?", (e) => {
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
        carrinho.addEventListener("click", () => {
            displayCart(cart);
        });

        main.appendChild(productCard);
    });
}

loadProducts();

const displayCart = (cart) => {
    main.innerHTML = "";
    others.innerHTML = "";
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

        if (cart.length != 0) {
            const buyButton = document.createElement("button");
            buyButton.classList.add("buyButton");
            buyButton.innerHTML = `Finalizar compra`;
            buyButton.onclick = () => { displayBuy() }
            others.appendChild(buyButton);
        }
    }
}

const displayBuy = () => {
    main.innerHTML = "";
    text.innerHTML = "";
    others.innerHTML = "";

    const buyForm = document.createElement("div");
    buyForm.style.cursor = "auto";
    buyForm.style.userSelect = "text";

    buyForm.innerHTML = `
        <form action="javascript:finishBuy()">
            <label>Rua:</label>
            <input type="text" id="rua" class="logupTexts" required><br><br>
            <label>Número:</label>
            <input type="number" min="1" id="numero" class="logupTexts" required><br><br>
            <label>Bairro:</label>
            <input type="text" id="bairro" class="logupTexts" required><br><br>
            <label>Cidade:</label>
            <input type="text" id="cidade" class="logupTexts" required><br><br>
            <label>Estado:</label>
            <input type="text" id="estado" class="logupTexts" required><br><br>
            <input type="submit" id="finishBuy" value="Finalizar compra" class="logupButtons">
        </form>
    `;

    main.appendChild(buyForm);
}

const finishBuy = () => {
    main.innerHTML = "<h2>Obrigado por comprar!</h2>";
}

const displayLogin = () => {
    main.innerHTML = "";
    text.innerHTML = "";
    others.innerHTML = "";

    const loginForm = document.createElement("div");
    loginForm.style.cursor = "auto";
    loginForm.style.userSelect = "text";

    loginForm.innerHTML = `
        <form action="javascript:loadLogin()">
            <label>E-mail:</label>
            <input type="email" id="email" class="loginTexts" required><br><br>
            <label>Senha:</label>
            <input type="password" id="password" class="loginTexts" required><br><br>
            <input type="submit" id="login" value="Entrar" class="loginButtons"><br><br>
            <input type="button" id="logup" value="Fazer cadastro" onclick="displayLogup()" class="loginButtons">
        </form>
    `;

    main.appendChild(loginForm);
}

const displayLogup = () => {
    main.innerHTML = "";
    text.innerHTML = "";
    others.innerHTML = "";

    const logupForm = document.createElement("div");
    logupForm.style.cursor = "auto";
    logupForm.style.userSelect = "text";

    logupForm.innerHTML = `
        <form action="javascript:loadLogup()">
            <label>Nome:</label>
            <input type="text" id="name" class="logupTexts" required><br><br>
            <label>CPF:&nbsp;&nbsp;</label>
            <input type="text" id="cpf" maxlength="14" oninput="cpfMask(event)" placeholder="000.000.000-00" class="logupTexts" required><br><br>
            <label>E-mail:</label>
            <input type="email" id="email" class="logupTexts" required><br><br>
            <label>Senha:</label>
            <input type="password" id="password" class="logupTexts" required><br><br>
            <input type="submit" id="logup" value="Cadastrar" class="logupButtons">
        </form>
    `;

    main.appendChild(logupForm);
}

const loadLogin = () => {
    $('#main').load("php/login.php", {
        'email': $("#email").val(),
        'password': $("#password").val()
    });
}

const loadLogup = () => {
    $('#main').load("php/cadastro.php", {
        'name': $("#name").val(),
        'cpf': $("#cpf").val(),
        'email': $("#email").val(),
        'password': $("#password").val()
    });
}

// Others
const enableDarkMode = () => {
    if (text.classList.contains("light-mode")) {
        text.classList.remove("light-mode");
        text.classList.add("dark-mode");
    } else {
        text.classList.remove("dark-mode");
        text.classList.add("light-mode");
    }

    if (document.body.classList.contains("light-mode")) {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    }
}

const clean = () => {
    localStorage.clear();
}

const cpfMask = (event) => {
    let resultado = event.target.value;

    cpf.value = resultado
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(\-d{2})\d+?$/, '$1')
}