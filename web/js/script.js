// Made by 1ukidev aka Leozinho

// Main
const main = document.getElementById("main");
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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const filteredProducts = category ? products.filter(product => product.category === category) : products;

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.setAttribute("product-id", product.id);

        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;

        productCard.addEventListener("click", function() {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart))
            displayCart(cart);
        });

        const carrinho = document.getElementById("carrinho");
        carrinho.addEventListener("click", function() {
            displayCart(cart);
        });

        main.appendChild(productCard);
    });
}

loadProducts();

const displayCart = (cart) => {
    const cartContainer = document.getElementById("main");
    cartContainer.innerHTML = "";
    alert("Adicionado com sucesso ao carrinho!");

    cart.forEach(product => {
        const productCard = document.createElement("div");
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;

        cartContainer.appendChild(productCard);
    });
}

// Others
const enableDarkMode = () => {
    const body = document.body;

    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }
}

const limpar = () => {
    localStorage.clear();
}