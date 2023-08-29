const productCountElement = document.getElementById("product-count");
const btnIncrease = document.getElementById("btn-increase");
const btnDecrease = document.getElementById("btn-decrease");

let productCount = 0;

btnIncrease.addEventListener("click", () => {
  productCount++;
  updateProductCount();
});

btnDecrease.addEventListener("click", () => {
  if (productCount > 0) {
    productCount--;
    updateProductCount();
  }
});

function updateProductCount() {
  productCountElement.textContent = productCount;
}
