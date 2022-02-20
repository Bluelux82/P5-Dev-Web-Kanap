// This function get all products by fetch API
async function getProducts() {
    const response = await fetch('http://localhost:3000/api/products')
    if(response.ok){
        return response.json()
    }
}

// Call getProducts function
getProducts()
    .then(function (products) {
        const boxItems = document.getElementById('items')
        
        // Foreach element in the response make a console log and create product in DOM (index.html)
        products.forEach(function (element) {
            console.log(element)

            // Create a new a for each product
            const newA = document.createElement('a')
            newA.href = ("./product.html?id=") + element._id
            // Create new article for each product
            const newArticle = document.createElement('article')
            newA.appendChild(newArticle)
            // Create new img for each product
            const newIMG = document.createElement('img')
            newIMG.src = element.imageUrl
            newIMG.alt = element.altTxt
            boxItems.appendChild(newA)
            newArticle.appendChild(newIMG)
            // Create a new H3 for each product
            const newH3 = document.createElement('h3')
            newH3.innerText = element.name
            newH3.classList.add("productName")
            newArticle.appendChild(newH3);
             // Create a new Paragraphe for each product
             const newParagraphe = document.createElement('p')
             newParagraphe.classList.add("productDescription")
             newArticle.appendChild(newParagraphe);
             newParagraphe.innerText = element.description
        });
    })
