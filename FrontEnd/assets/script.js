const api_works = "http://localhost:5678/api/works";
const token = localStorage.getItem("jwt");

console.log("teste")
async function Bcategories() {
    const categoriesButtons = await fetch("http://localhost:5678/api/categories");
    const buttonCategory = await categoriesButtons.json();
    
    buttonCategory.forEach(category => {
        
        let bodyButton = `<input type="submit" value="${category.name}" class="bodyButton">`;
       let filterButton = document.getElementById("filters");
       filterButton.innerHTML += bodyButton;
    })
}
// =======================================================
// Étape 1.1 : Récupération des travaux depuis le back-end
// =======================================================
async function getWorksfromAPI() {
    // On utilise l'API Fetch pour récupérer les travaux (GET). 
    // On stocke la réponse de la requête dan une variable URLAPIwork
    const URLAPIwork = await fetch(api_works);

    // On extrait les données JSON de la réponse de la requête et les stocke dans la variable AllWorks.
    const AllWorks   = await URLAPIwork.json();

    // On commence une boucle qui parcourt chaque élément (work) dans le tableau AllWorks.
    AllWorks.forEach(work => { // work est le paramètre de la boucle 
        const image = work.imageUrl;
        const title = work.title;
        const category = work.category.name;

        //On crée le bloc figure HTML correspondant à chaque catégorie, puis on les ajoute à un élément HTML ayant l'ID "gallery". 
        document.getElementById("gallery").innerHTML += `
        <figure name="${category}">
				<img src="${image}" alt="${title}" >
				<figcaption>${title}</figcaption>
		</figure>
        `;
    });

    // On initialise un ensemble (Set) pour stocker les catégories uniques.
    const uniqueCategories = new Set();

    // On parcoure tous les travaux et ajoute chaque catégorie à l'ensemble uniqueCategories.
      AllWorks.forEach(work => {
        uniqueCategories.add(work.category.name);
    });
    // Appel de la fonction pour l'affichage des catégories.
    getCategoriesfromAPI(uniqueCategories);
}

getWorksfromAPI() // Appel de la fonction , sans ça la fonction écrite plus haut ne sera pas executé.

// ===============================================
// Étape 1.2 : Réalisation du filtre des travaux
// ==================================================


// Étape 1.2 Fonction pour Afficher les catégories
// ==================================================
async function getCategoriesfromAPI(array) {
    // Créez un bouton "Tous" par défaut.
    let allButton = document.createElement("input");
    allButton.type = "submit";
    allButton.value = "Tous";
    allButton.classList.add("bodyButton");

    // Ajoutez le bouton "Tous" à l'élément avec l'ID "filters".
    document.getElementById("filters").appendChild(allButton);

    // On commence une boucle qui parcourt chaque élément (category) dans le tableau AllCategories.
    array.forEach(category => {
        //On crée des boutons HTML correspondant à chaque catégorie, puis les ajoute à un élément HTML ayant l'ID "filters". 
       let bodyButton = `<input type="submit" value="${category}" class="bodyButton">`;
       let filterButton = document.getElementById("filters");
       filterButton.innerHTML += bodyButton; // le += est important pour ajouter toutes les catégories. 
       // équivalent à : filterButton.innerHTML = filterButton.innerHTML + bodyButton => à chaque tour rajout d'un bouton
    })

    // Appel de la fonction pour activer le filtrage par catégorie.
    filterByCategory();
}


// Étape 1.2 Fonction pour trier les travaux par catégories 
// =======================================================
async function filterByCategory() {
    // On selectionne tous les boutons de catégorie avec la classe "bodyButton".
    let CategoryButtons = document.querySelectorAll(".bodyButton"); 

    // Pour chaque bouton de catégorie, on ajoute un écouteur d'événements au clic.
    CategoryButtons.forEach(buttonCategory =>  {
        buttonCategory.addEventListener("click", function () {
            // On obtient la valeur du bouton de catégorie ("objet, appartement ou restaurant")
            const buttonCategoryValue = buttonCategory.getAttribute("value");

            // Sélectionnez tous les éléments de la galerie (figures).
            const galleryItems = document.querySelectorAll(".gallery figure"); 
            
            // Utilisez la méthode filter pour obtenir les éléments de la galerie correspondant à la catégorie sélectionnée.
            const filteredGalleryItems = Array.from(galleryItems).filter(item => {
                // Assurez-vous de comparer la catégorie de l'élément avec la catégorie sélectionnée.
                return item.getAttribute("name") === buttonCategoryValue;
            });

            // Pour chaque élément de la galerie, Afficher ou non en fonction de s'il correspond à la catégorie sélectionnée.
            galleryItems.forEach(item => {
                if (filteredGalleryItems.includes(item) || buttonCategoryValue === "Tous") {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}



console.log(token)

let logout = document.getElementById("log");
if (token == null) {
    logout.innerHTML = "login"

} else {
    logout.innerHTML = "logout"
}


let spanOut = document.getElementById("modifier");
spanOut.innerHTML += `<i class="fa-solid fa-pen-to-square"></i> Modifier`;


if (token == null) {
    spanOut.style.visibility = 'hidden'
} else {
    spanOut.style.visibility = 'visible' }


























/*const form = document.querySelector('form');
    form.addEventListener("submit", (event) => { 
    event.preventDefault();
    console.log("Il n'y a rien");

    const email = document.getElementById("email").value ;
    const passwod = document.getElementById("password").value ;
    console.log(email);
    console.log(password);

    const balisePassword = document.getElementById("password");
    const valeurPassword = balisePassword.value;
    if (valeurPassword === " "){
        console.log("le champs est vide")
        } else {
        console.log("le champs est rempli")    
        }

    //let maVariable = document.getElementById("idInexistant") <- ?
    //if (maVariable === null) {
    //console.log("l'élément n'existe pas")
    //}else {
    //maVariable.creatElement("div")   
    //}    
})
*/