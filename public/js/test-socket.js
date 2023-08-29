const socket = io();

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescription = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputThumbnail = document.getElementById("form-thumbnail");
const inputCategory = document.getElementById("form-category");
const dinamicListProducts = document.getElementById("dinamic-list-products");

socket.on("products", (productCreated) => {
  console.log(productCreated);
  let newProducts = "";

  newProducts += ` <tr>
    <th scope="row">*</th>
    <td>${productCreated._id}</td>
    <td>${productCreated.title}</td>
    <td>${productCreated.price}</td>
    <td>${productCreated.description}</td>
    <td>${productCreated.thumbnail}</td>
    <td>${productCreated.code}</td>
    <td>${productCreated.Stock}</td>
    <td>${productCreated.category}</td>
  </tr>
      `;
  dinamicListProducts.innerHTML += newProducts;
});

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
    code: inputCode.value,
    stock: inputStock.value,
    thumbnail: inputThumbnail.value,
    category: inputCategory.value,
  };
  socket.emit("new-product", newProduct);
});
