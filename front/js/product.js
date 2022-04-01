// Get the value id from the URL
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

// Get id from elements in the DOM
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColorsChoice = document.getElementById("colors");
let productImg = document.querySelector(".item__img");
let img = document.createElement("img"); // Create img for the product.
productImg.appendChild(img);
const colorsOption = document.querySelector("#colors");
const productQuantity = document.querySelector("#quantity");

// Call getProducts function.
async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products/" + id);
    if (response.ok) {
        return response.json();
    }
}

async function displayProduct() {
    product = await getProducts();
    console.log(product);
    productTitle.innerHTML = product.name;
    productPrice.innerHTML = product.price;
    productDescription.innerHTML = product.description;
    img.src = product.imageUrl; // add img URL of the product from API
    img.alt = product.altTxt; // add alt text of the product from API
    /* For each object from the API in the array "colors" create an option and apply a value to it 
         as well as a text in the order for example from [0] to [3] */
    for (let i = 0; i < product.colors.length; i++) {
        let colorChoice = document.createElement("option");
        colorChoice.value = product.colors[i];
        colorChoice.innerHTML = product.colors[i];
        productColorsChoice.appendChild(colorChoice);
    }
    // Get all choice product informations when clicking add to cart.
    const addToCartButton = document.querySelector("#addToCart");
    addToCartButton.addEventListener("click", (event) => {
        let color = colorsOption.value;
        let qte = productQuantity.value;
        if (color == "" || qte < 1 || qte > 100) {
            alert("Quantité ou couleur invalide");
        } else {
            let finalProduct = {
                color: color,
                idProduct: product._id,
                quantity: qte,
            };
            alert("produit ajouté au panier avec succès")
            console.log(finalProduct);
            // Local Storage
            let productInLocalStorage = JSON.parse(localStorage.getItem("product")); // JSON.parse convert data JSON to javascript object  from localstorage.
            console.log(productInLocalStorage);
            const search = productInLocalStorage.find((el) =>  el.color === color && el.idProduct === id)
            // If there is already product in localstorage
            if (search){
                let newQuantity = parseInt(qte) + parseInt(search.quantity);
                search.quantity = newQuantity;
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            } else if (productInLocalStorage) {
                productInLocalStorage.push(finalProduct);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                console.log(productInLocalStorage);
            // If there is no product in localstorage
            } else {
                productInLocalStorage = [];
                productInLocalStorage.push(finalProduct);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                console.log(productInLocalStorage);
            }
        }
    });
}
displayProduct();