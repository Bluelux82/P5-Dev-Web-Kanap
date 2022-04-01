let cart = document.querySelector("h1");
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

// If cart is empty
if (productInLocalStorage === null || productInLocalStorage == 0) {
    cart.innerText = "Votre panier est vide.";
} else {
    for (let product in productInLocalStorage) {
        // Adding HTML to the cart.html page
        const container = document.getElementById("cart__items");
        // Article
        const cartArticle = document.createElement("article");
        cartArticle.classList.add("cart__item");
        cartArticle.setAttribute(
            "data-id",
            productInLocalStorage[product].idProduct
        ); // Insert specified value of the object from localstorage into HTML
        cartArticle.setAttribute(
            "data-color",
            productInLocalStorage[product].color
        ); // Insert specified value of the object from localstorage into HTML
        container.appendChild(cartArticle);
        // Container for product img
        const containerProductImg = document.createElement("div");
        containerProductImg.classList.add("cart__item__img");
        cartArticle.appendChild(containerProductImg);
        // Product img
        const productImg = document.createElement("img");
        containerProductImg.appendChild(productImg);
        // Cart item content
        const cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        cartArticle.appendChild(cartItemContent);
        // Cart item content description
        const cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add(
            "cart__item__content__description"
        );
        cartItemContent.appendChild(cartItemContentDescription);
        // Product name
        const productName = document.createElement("h2");
        cartItemContentDescription.appendChild(productName);
        // Product color
        const productColor = document.createElement("p");
        productColor.innerText = productInLocalStorage[product].color; // Insert specified value of the object from localstorage into HTML
        cartItemContentDescription.appendChild(productColor);
        // Product price
        const productPrice = document.createElement("p");
        cartItemContentDescription.appendChild(productPrice);
        // Cart item content settings
        const cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");
        cartItemContent.appendChild(cartItemContentSettings);
        // Cart item content settings quantity
        const cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList.add(
            "cart__item__content__settings__quantity"
        );
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        // Product quantity
        const productQuantity = document.createElement("p");
        productQuantity.innerText = "Qté :";
        cartItemContentSettingsQuantity.appendChild(productQuantity);
        // Input
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("itemQuantity");
        input.name = "itemQuantity";
        input.min = "1";
        input.max = "100";
        input.value = productInLocalStorage[product].quantity; // Insert specified value of the object from localstorage into HTML
        cartItemContentSettingsQuantity.appendChild(input);
        // Cart item content settings delete
        const cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add(
            "cart__item__content__settings__delete"
        );
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        // Delete item html content
        const deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.innerText = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItem);
        // Call getProducts function.
        async function getProducts() {
            const response = await fetch(
                "http://localhost:3000/api/products/" +
                productInLocalStorage[product].idProduct
            );
            if (response.ok) {
                return response.json();
            }
        }
        async function displayProduct() {
            apiElement = await getProducts();
            console.log(apiElement);
            productImg.src = apiElement.imageUrl; // Insert specified value of the object from API into HTML
            productImg.alt = apiElement.altTxt; // Insert specified value of the object from API into HTML
            productName.innerText = apiElement.name; // Insert specified value of the object from API into HTML
            productPrice.value = apiElement.price;
            productPrice.innerText = apiElement.price + " €"; // Insert specified value of the object from API into HTML
            // ---------------------------------- Total products price ----------------------------------
            let totalPrice = document.getElementById("totalPrice");
            if (totalPrice.innerText == "") {
                totalPrice.innerText =
                    apiElement.price * parseInt(productInLocalStorage[product].quantity);
            } else {
                totalPrice.innerText =
                    parseInt(totalPrice.innerText) +
                    apiElement.price * parseInt(productInLocalStorage[product].quantity);
            }
            /* ----------------------------------
                        Total products price - END 
                        ---------------------------------- */
        }
        displayProduct();
    }
}

// ---------------------------------- Delete item ----------------------------------
let deleteArticle = document.querySelectorAll(".deleteItem"); // This variable select all delete button
for (let i = 0; i < deleteArticle.length; i++) {
    deleteArticle[i].addEventListener("click", (event) => {
        // Listen click on delete button
        event.preventDefault();
        let idDelete = productInLocalStorage[i].idProduct;
        let colorDelete = productInLocalStorage[i].color;
        productInLocalStorage = productInLocalStorage.filter(
            (element) =>
                element.idProduct !== idDelete || element.color !== colorDelete
        );
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        location.reload();
    });
}
/* ---------------------------------- 
Delete item - END 
---------------------------------- */

let productNumber = document.getElementsByClassName("itemQuantity"); // This variable get all the input itemQuantity

// ---------------------------------- Total product quantity ----------------------------------
productTotalQuantity = 0;
for (let q = 0; q < productNumber.length; q++) {
    productTotalQuantity += productNumber[q].valueAsNumber;
}
let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.innerText = productTotalQuantity; // Insert total quantity into HTML
/* ---------------------------------- 
Total product quantity - END 
---------------------------------- */

// ---------------------------------- Modify product quantity ----------------------------------
let quantityInput = document.querySelectorAll(".itemQuantity");
for (let q = 0; q < quantityInput.length; q++) {
    quantityInput[q].addEventListener("change", (event) => {
        let quantityModif = productInLocalStorage[q].quantity;
        let quantityValue = quantityInput[q].valueAsNumber;
        const result = productInLocalStorage.filter(
            (element) => element.quantityValue !== quantityModif
        );
        result.quantity = quantityValue;
        productInLocalStorage[q].quantity = result.quantity;
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        // reload page
        location.reload();
    });
}
/* ---------------------------------- 
Modify product quantity - END 
---------------------------------- */
// ---------------------------------- FORMULAR ----------------------------------
// Select confirmation button formular
const confirmationButtonFormular = document.querySelector("#order");
// Select p for errorMsg
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg"); // firstName Error-p
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg"); // lastName Error-p
const addressErrorMsg = document.getElementById("addressErrorMsg"); // address Error-p
const cityErrorMsg = document.getElementById("cityErrorMsg"); // city Error-p
const emailErrorMsg = document.getElementById("emailErrorMsg"); // email Error-p

// ---------------------------------- addEventListener ------------
confirmationButtonFormular.addEventListener("click", (event) => {
    event.preventDefault();
    // Constructor for localStorage
    class formular {
        constructor() {
            this.firstName = document.querySelector("#firstName").value;
            this.lastName = document.querySelector("#lastName").value;
            this.address = document.querySelector("#address").value;
            this.city = document.querySelector("#city").value;
            this.email = document.querySelector("#email").value;
        }
    }
    // Call formular to create an object
    const formularValues = new formular();
    //  --------------- REGEX --------------
    const nameCityRegEx = (value) => {
        return /^[A-Za-z-\u00C0-\u00FF]{3,20}$/.test(value);
    };
    const addressRegEx = (value) => {
        return /^[A-Za-z0-9,\u00C0-\u00FF\s]{5,50}$/.test(value);
    };
    const emailRegEx = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };
    // Check firstName validity
    function firstNameCheck() {
        const firstNameVal = formularValues.firstName;
        if (nameCityRegEx(firstNameVal)) {
            firstNameErrorMsg.innerText = "";
            return true;
        } else {
            firstNameErrorMsg.innerText =
                "*Saisissez un prénom d'au moins 3 caractères. (éviter les caractéres spéciaux)"; // If false write error msg into HTML
            return false;
        }
    }
    // Check lastName validity
    function lastNameCheck() {
        const lastNameVal = formularValues.lastName;
        if (nameCityRegEx(lastNameVal)) {
            lastNameErrorMsg.innerText = "";
            return true;
        } else {
            lastNameErrorMsg.innerText =
                "*Saisissez un nom d'au moins 3 caractères. (éviter les caractéres spéciaux)"; // If false write error msg into HTML
            return false;
        }
    }
    // Check city validity
    function cityCheck() {
        const cityVal = formularValues.city;
        if (nameCityRegEx(cityVal)) {
            cityErrorMsg.innerText = "";
            return true;
        } else {
            cityErrorMsg.innerText = "*Veuillez indiquer votre ville.";
            return false;
        }
    }
    // Check address validity
    function addressCheck() {
        const addressVal = formularValues.address;
        if (addressRegEx(addressVal)) {
            addressErrorMsg.innerText = "";
            return true;
        } else {
            addressErrorMsg.innerText =
                "*L'adresse que vous avez saisie n'est pas valide et/ou n'existe pas."; // If false write error msg into HTML
            return false;
        }
    }
    // Check email validity
    function emailCheck() {
        const emailVal = formularValues.email;
        if (emailRegEx(emailVal)) {
            emailErrorMsg.innerText = "";
            return true;
        } else {
            emailErrorMsg.innerText = "*Veuillez saisir une adresse email valide."; // If false write error msg into HTML
            return false;
        }
    }
    //let test = firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && emailCheck();

    let test = true;

    if (!firstNameCheck()) {
        test = false;
    }
    if (!lastNameCheck()) {
        test = false;
    }
    if (!addressCheck()) {
        test = false;
    }
    if (!cityCheck()) {
        test = false;
    }
    if (!emailCheck()) {
        test = false;
    }

    //WIN + MAJ + S

    // Check if formular value are true
    if (window.localStorage.length === 0) {
        alert("Impossible de valider la commande si le panier est vide.");
    } else if (test) {
        // Array contains each id of products present into the cart for POST
        let idOfEachProductInCart = [];
        for (let i = 0; i < productInLocalStorage.length; i++) {
            idOfEachProductInCart.push(productInLocalStorage[i].idProduct);
        }

        // This variable contains "contact and idOfEachProductInCart" content for POST.
        const order = {
            // this object contains all the informations write in formular for POST
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            },
            products: idOfEachProductInCart,
        };
        // If true update object in localstorage and execute POST
        const send = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        });
        send.then(async (response) => {
            const resp = await response.json();
            if (response.ok) {
                localStorage.setItem("orderId", resp.orderId);
                console.log(resp.orderId);
                document.location.href = "confirmation.html";
            }
        });
    } else {
        // Do nothing
    }
});
