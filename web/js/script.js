// Made by 1ukidev aka Leozinho

// Startup
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const changeHash = (hash) => {
    return location.hash = hash;
}

window.addEventListener('hashchange', () => {
    switch (location.hash) {
        case "":
            displayProducts();
            break;
        case "#perfil":
            displayProfile();
            break;
        case "#login":
            displayLogin();
            break;
        case "#logup":
            displayLogup();
            break;
        case "#finalizar":
            displayBuy();
            break;
        case "#carrinho":
            displayCart();
            break;
        case "#brinquedos":
            displayProducts("Brinquedos");
            break;
        case "#roupas":
            displayProducts("Roupas");
            break;
        case "#enxoval":
            displayProducts("Enxoval");
            break;
        case "#higiene":
            displayProducts("Higiene");
            break;
        case "#saude":
            displayProducts("Saúde");
            break;
    }
});

const profileName = JSON.parse(localStorage.getItem("profileName")) || [];
const userEmail = JSON.parse(localStorage.getItem("userEmail")) || [];
let emailHash = localStorage.getItem('emailHash') || null;
let nameHash = localStorage.getItem('nameHash') || null;
let darkModeisEnable;

if (!profileName.length <= 0) {
    document.getElementById("login").style.display = "none";
    document.getElementById("profile").style.display = "block";
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    darkModeisEnable = localStorage.getItem("darkModeisEnable") || "false";
} else {
    darkModeisEnable = localStorage.getItem("darkModeisEnable") || "true";
}

if (darkModeisEnable === "false") {
    document.getElementById("text").classList.remove("dark-mode");
    document.getElementById("text").classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
} else {
    document.getElementById("text").classList.remove("light-mode");
    document.getElementById("text").classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
}

// Crypto
const createSignature = (data, secretKey) => {
    const signature = CryptoJS.HmacSHA256(data, secretKey).toString(CryptoJS.enc.Hex);
    return signature;
}

const secretKey = "cjr4-032x";

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
            const tmp = location.hash;
            changeHash("loading");
            changeHash(tmp);
        })
        .catch(error => {
            alertify.error("Erro ao carregar os produtos / Tente recarregar a página");
            console.error("Erro ao carregar os produtos: ", error);
        });
}

const displayProducts = (category = null) => {
    main.innerHTML = "";
    others.innerHTML = "";
    const filteredProducts = category ? products.filter(product => product.category === category) : products;

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.setAttribute("product-id", product.id);

        if (category === null) {
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
                        changeHash("carrinho");
                        alertify.success("Adicionado com sucesso!");
                    } else {
                        alertify.error("Não foi possível adicionar ao carrinho / Tente mais tarde");
                        changeHash("");
                        console.error("Não foi possível adicionar ao carrinho");
                    }
                }).set({
                    title: "ㅤ"
                })
                .set({
                    labels: {
                        ok: "Sim",
                        cancel: "Não"
                    }
                })
                .setting("modal", false)
        });

        main.appendChild(productCard);
    });
}

loadProducts();

const displayCart = () => {
    main.innerHTML = "";
    others.innerHTML = "";
    text.innerHTML = "<h1>Carrinho:</h1>";

    if (cart.length === 0) {
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

        others.innerHTML = `
            <button class="buyButton" onclick="changeHash('finalizar')">Finalizar compra</button>
        `;
    }
}

const displayBuy = () => {
    main.innerHTML = "";
    text.innerHTML = "";
    others.innerHTML = "";

    if (localStorage.getItem("cart") === null) {
        main.innerHTML = "<h2>Você não colocou nenhum produto no carrinho</h2>"

        others.innerHTML = `
            <button class="buyButton" onclick="changeHash('loading'); changeHash('')">
                Voltar para o início
            </button>
        `;

        return console.error("Não há nada no carrinho");
    }

    if (localStorage.getItem("userEmail") === null) {
        main.innerHTML = "<h2>Você não está logado</h2>"

        others.innerHTML = `
            <button class="buyButton" onclick="changeHash('loading'); changeHash('login')">Fazer login</button>
        `;

        return console.error("Usuário não está logado");
    }

    const buyForm = document.createElement("div");
    buyForm.style.cursor = "auto";
    buyForm.style.userSelect = "text";

    buyForm.innerHTML = `
        <form action="javascript:finishBuy()">
            <label>Rua:</label>
            <input type="text" onkeydown="return /[a-zA-ZÀ-ÿ, ]/.test(event.key)" id="street" class="logupTexts" required><br><br>
            <label>Número:</label>
            <input type="text" oninput="numberMask(event)" id="number" class="logupTexts" required><br><br>
            <label>Bairro:</label>
            <input type="text" onkeydown="return /[a-zA-ZÀ-ÿ, ]/.test(event.key)" id="district" class="logupTexts" required><br><br>
            <label>Cidade:</label>
            <input type="text" onkeydown="return /[a-zA-ZÀ-ÿ, ]/.test(event.key)" id="city" class="logupTexts" required><br><br>
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
            <input type="button" id="logup" value="Fazer cadastro" onclick="changeHash('logup')" class="loginButtons">
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
            <input type="text" id="name" onkeydown="return /[a-zA-ZÀ-ÿ, ]/.test(event.key)" class="logupTexts" required><br><br>
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

const loadLogin = () => {
    $('#main').load("php/login.php", {
        'email': $("#email").val(),
        'password': $("#password").val()
    });
}

const loadLogup = () => {
    emailHash = createSignature($("#email").val(), secretKey);
    nameHash = createSignature($("#name").val(), secretKey);

    if (emailHash) {
        localStorage.setItem('emailHash', emailHash);
    } else {
        alertify.error("Hash de e-mail inválido");
        changeHash("");
        return console.error("Hash de e-mail inválido");
    }

    if (nameHash) {
        localStorage.setItem('nameHash', nameHash);
    } else {
        alertify.error("Hash de nome inválido");
        changeHash("");
        return console.error("Hash de nome inválido");
    }

    $('#main').load("php/logup.php", {
        'name': $("#name").val(),
        'cpf': $("#cpf").val(),
        'email': $("#email").val(),
        'emailHash': emailHash,
        'nameHash': nameHash,
        'password': $("#password").val()
    });
}

const finishBuy = () => {
    nameHash = createSignature(profileName[0], secretKey);

    if (nameHash) {
        localStorage.setItem('nameHash', nameHash);
    } else {
        alertify.error("Hash de nome inválido");
        changeHash("");
        return console.error("Hash de nome inválido");
    }

    $('#main').load("php/buy.php", {
        'street': $("#street").val(),
        'number': $("#number").val(),
        'district': $("#district").val(),
        'city': $("#city").val(),
        'state': $("#state").val(),
        'userEmail': userEmail[0],
        'emailHash': emailHash,
        'profileName': profileName[0],
        'nameHash': nameHash,
        'price': estimatePrice(),
    });
}

const displayProfile = () => {
    text.innerHTML = "";
    others.innerHTML = "";

    if (profileName[0] === undefined) {
        main.innerHTML = `
            <h2>Você não está logado</h2>
        `;

        others.innerHTML = `
            <button class="buyButton" onclick="changeHash('loading'); changeHash('login')">
                Fazer login
            </button>
        `;

        return console.error("Usuário não está logado");
    }

    text.innerHTML = "<h1>Perfil</h1>";

    main.innerHTML = `
        <h2>Seu nome: ${profileName[0]}</h2>
    `;

    others.innerHTML = `
        <button class="logoutButton" onclick="cleanAll()">Deslogar</button>
    `;
}

// Others
const changeTheme = () => {
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
        localStorage.setItem("darkModeisEnable", "true");
    } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        localStorage.setItem("darkModeisEnable", "false");
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

const estimatePrice = () => {
    let price = 0;

    if (cart && Array.isArray(cart)) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i] && cart[i].price) {
                price += parseInt(cart[i].price.slice(2));
            }
        }
    }

    return price;
}

const cleanAll = () => {
    localStorage.clear();
    location.href = "/";
}