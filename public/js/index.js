const addProduct = document.getElementById('addProductCart');


addProduct.addEventListener('click', () => {
    const productId = addProduct.dataset.productId;
    const cartId = addProduct.dataset.cartId;

    fetch(`/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            fetch(`/cart/${cartId}/product/${productId}`, {
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
