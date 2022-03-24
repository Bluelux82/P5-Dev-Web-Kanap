const orderId = document.getElementById("orderId");
let orderDenied = document.querySelector("p")
if (window.localStorage.length === 0){
    // If localstorage is empty send error message.
    alert("Erreur: il semblerait que votre commande n'ait pas pu aboutir !")
    orderDenied.innerHTML = "Commande refusée : <br> Une erreur s'est produite, <br> lors de la confirmation de votre commande."
} else {
    // else if localstorage is not empty write the order-Id and clear the localstorage.
    orderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}