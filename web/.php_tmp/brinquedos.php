<script>
        fetch('json/products.json')
            .then(response => response.json())
            .then(data => {
                let productHtml = '';
                var selectedType = 'Brinquedos';

                for (let i = 0; i < data.length; i++) {
                    let product = data[i];

                    if(product.type == selectedType) {
                        productHtml += '<a class="product" href="#">'
                        productHtml += '<img height="75" src="' + product.img + '"</p>';
                        productHtml += '<p class="product-title">' + product.name + '</p>';
                        productHtml += '<p class="product-price">R$' + product.price + '</p>';
                        productHtml += '</a>';
                    }
                }

                document.getElementById('main').innerHTML = productHtml;
            })
            .catch(error => {
                document.getElementById('main').innerHTML = 'Erro ao carregar os dados dos produtos';
            });
</script>