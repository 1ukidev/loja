// Made by 1ukidev aka Leozinho

// Startup
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.getElementById("text").classList.remove("dark-mode");
    document.getElementById("text").classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
}

let profileName = JSON.parse(localStorage.getItem("profileName")) || [];
let userEmail = JSON.parse(localStorage.getItem("userEmail")) || [];

if (!profileName.length <= 0) {
    document.getElementById("login").style.display = "none";
    document.getElementById("profile").style.display = "block";
}

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
                if (e) {
                    cart.push(product);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    displayCart(cart);
                    alertify.success("Adicionado com sucesso!");
                }
            }).set({title:"ㅤ"})
              .set({labels: {ok: "Sim", cancel: "Não"}})
              .setting("modal", false)
        });

        const cartHTML = document.getElementById("cart");
        cartHTML.addEventListener("click", () => {
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
            others.innerHTML = `
                <button class="buyButton" onclick="displayBuy()">Finalizar compra</button>
            `;
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
            <input type="text" onkeydown="return /[a-z, ]/i.test(event.key)" id="street" class="logupTexts" required><br><br>
            <label>Número:</label>
            <input type="text" oninput="numberMask(event)" id="number" class="logupTexts" required><br><br>
            <label>Bairro:</label>
            <input type="text" onkeydown="return /[a-z, ]/i.test(event.key)" id="district" class="logupTexts" required><br><br>
            <label>Cidade:</label>
            <input type="text" onkeydown="return /[a-z, ]/i.test(event.key)" id="city" class="logupTexts" required><br><br>
            <label>Estado:</label>
            <select id="state" class="logupTexts" required>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
            </select><br><br>
            <input type="submit" id="finishBuy" value="Finalizar compra" class="logupButtons">
        </form>
    `;

    main.appendChild(buyForm);
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
            <label>CPF:</label>
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

const estimatePrice = () => {
    let price = 0;
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (cart && Array.isArray(cart)) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i] && cart[i].price) {
                price += parseInt(cart[i].price.slice(2));
            }
        }
    }

    return price;
}

const loadLogin = () => {
    $('#main').load("php/login.php", {
        'email': $("#email").val(),
        'password': $("#password").val()
    });
}

const loadLogup = () => {
    $('#main').load("php/logup.php", {
        'name': $("#name").val(),
        'cpf': $("#cpf").val(),
        'email': $("#email").val(),
        'password': $("#password").val()
    });
}

const finishBuy = () => {
    $('#main').load("php/buy.php", {
        'street': $("#street").val(),
        'number': $("#number").val(),
        'district': $("#district").val(),
        'city': $("#city").val(),
        'state': $("#state").val(),
        'userEmail': userEmail[0],
        'profileName': profileName[0],
        'price': estimatePrice(),
    })
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

const cpfMask = (event) => {
    let result = event.target.value;

    cpf.value = result
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(\-d{2})\d+?$/, '$1');
}

const numberMask = (event) => {
    let result = event.target.value;

    number.value = result
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');
}

const clean = () => {
    localStorage.clear();
    location.href = "/loja/web";
}

const displayProfile = () => {
    text.innerHTML = "";
    others.innerHTML = "";

    if(profileName[0] == undefined) {
        main.innerHTML = `
            <h2>Usuário não está logado</h2>
        `;
    } else {
        text.innerHTML = "<h1>Perfil<h1>";

        main.innerHTML = `
            <h2>Seu nome: ${profileName[0]}</h2>
        `;

        others.innerHTML = `
            <button class="logoutButton" onclick="clean()">Deslogar</button>
        `;
    }
}