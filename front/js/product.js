// Get the value id from the URL
let params = (new URL(document.location)).searchParams;
let id = params.get("id")
console.log(id)

// Get id from elements in the DOM
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColorsChoice = document.getElementById("colors");
let productImg = document.querySelector(".item__img");
// Create image of the product.
let img = document.createElement("img");
productImg.appendChild(img);

// Call getProducts function.
async function getProducts() {
    const response = await fetch('http://localhost:3000/api/products/' + id)
    if(response.ok){
        return response.json();
    }
}
// Add product information from the Api into the DOM.
getProducts()
.then (function (products) {
    console.log(products)
    productTitle.innerHTML = products.name
    productPrice.innerHTML = products.price
    productDescription.innerHTML = products.description
    img.src = products.imageUrl
    img.alt = products.altTxt
    /* For each object from the API in the array "colors" create an option and apply a value to it
     as well as a text in the order for example from [0] to [3] */
    for (let i=0; i < products.colors.length; i++) {
        let colorChoice = document.createElement("option");
        colorChoice.value = products.colors[i]
        colorChoice.innerHTML = products.colors[i]
        productColorsChoice.appendChild(colorChoice);
    }    
});