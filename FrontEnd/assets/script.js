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
async function getWorksfromAPI(div, modale) {
    // div parce qu'on veut le mettre dans deux div
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
        document.getElementById(div).innerHTML += `
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
    if (!modale) {
        getCategoriesfromAPI(uniqueCategories)
    }
    
}

getWorksfromAPI("gallery", false) // Appel de la fonction , sans ça la fonction écrite plus haut ne sera pas executé.

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


//Récupérer la modal et le bouton
let modal = document.getElementById("myModal");
console.log(modal)
let btn = document.getElementById("modifier");
btn.addEventListener("click", fonctionModale => {
    modal.style.display = "block";
    getWorksfromAPI("galleryModale", true)
    console.log("yo")
})
console.log(btn)

//Récupération du span qui ferme la modale 
let span = document.getElementById("close");
console.log(span)
span.addEventListener("click", fonctionModale => {
    modal.style.display = "none";
})


// si on clique en dehors de la modale, ça la ferme 
window.onclick = function(event) {
    if (event.target == modal){
        modal.style.display = "none";
    }
}

    
// Récupérez le fichier d'entrée (input type="file") depuis le formulaire
const imageInput = document.getElementById('media_image');
const imageFile = imageInput.files[0];

// Créez un objet FormData pour envoyer le fichier
const formData = new FormData();
formData.append('image', imageFile);

// Remplacez l'URL de l'API par l'URL de votre propre API
const apiUrl = 'http://votre-api.com/upload-image';

// Envoi de la requête POST vers votre API pour télécharger l'image
fetch(apiUrl, {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => {
    // Gérez la réponse de votre API ici
    console.log('Réponse de l\'API :', data);
  })
  .catch(error => {
    console.error('Erreur lors de l\'envoi de la requête :', error);
  });