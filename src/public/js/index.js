const addProduct = document.getElementById('addProductCart');

addProduct.addEventListener('click', () => {
    const productId = addProduct.dataset.productId;

    fetch(`/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            fetch(`/cart/64b08d684c8079b1866ca967/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
});
