const api_works = "http://localhost:5678/api/works";
const token = localStorage.getItem("jwt");

//afficher les images

async function RecupImages(site, modale) {
    const apiworks = await fetch(api_works);
    const worksjson = await apiworks.json();
    const uniqueCategories = new Set();

    worksjson.forEach(work => {
        const urlImage = work.imageUrl;
        const titleImage = work.title;
        const categoryImage = work.category.name;
        const imageId = work.id;

        document.getElementById(site).innerHTML += `
        <figure name="${categoryImage}"id="work_${imageId}">
				<img src="${urlImage}" alt="${titleImage}" >
				<figcaption>${titleImage}</figcaption>
                <a href="#" class="delete" id=${imageId}"><i class="fa-solid fa-trash-can"></i> </a>
		</figure>
        `;
    });

    worksjson.forEach(work => {
        uniqueCategories.add(work.category.name);
    });

    const buttonDeleteList = document.querySelectorAll(".delete");

    buttonDeleteList.forEach(buttonDelete => {
        buttonDelete.addEventListener("click", () => {
            const workId = buttonDelete.parentElement.id.split('_').pop();
            suppImage(workId);
        })

    })

    if (!modale) {
        recupCategory(uniqueCategories);
    }
}

async function recupCategory(Array) {
    let allButton = document.createElement("input");
    allButton.type = "submit";
    allButton.value = "Tous";
    allButton.classList.add("bodyButton");
    document.getElementById("filters").appendChild(allButton);

    Array.forEach(category => {
        let bodyButton = `<input type="submit" value="${category}" class="bodyButton">`;
        let filterButton = document.getElementById("filters");
        filterButton.innerHTML += bodyButton; 
    })
    filterCategory();
}

async function filterCategory() {
    let categoryButtons = document.querySelectorAll('.bodyButton');

    categoryButtons.forEach(buttonCategory => {
        buttonCategory.addEventListener("click", function() {
        const buttonCategoryValue = buttonCategory.getAttribute("value");
        const imageGallery = document.querySelectorAll(".gallery figure");
        const imagesGalleryFiltre = Array.from(imageGallery).filter(item => {
            return item.getAttribute("name") === buttonCategoryValue;
        });

        imageGallery.forEach(item => {
            if (imagesGalleryFiltre.includes(item) || buttonCategoryValue === "Tous") {
                item.computedStyleMap.display = "block";
            } else {
                item.computedStyleMap.display = "none";
            }
        });
    });
});
}

async function ajoutImages () {
    const imageInput = document.getElementById("image");
    const imageFile = imageInput.files[0];

    const titreInput = document.getElementById("title");
    const titre = titreInput.value;

    const categoryInput = document.getElementById("category");
    const categoryId = categoryInput.value;

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("titre", titre);
    formData.append("category", categoryId);

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData
    };

    try {
        const response = await fetch(api_works, requestOptions);
        if (response.ok) {
            const responseData = await response.json();
            console.log("Travail ajouté avec succès :", responseData)
        } else {
            console.error ("Erreur lors de l'ajout du travail. Code de réponse :", response.status);
        }
        } catch(error) {
            console.error("Erreur lors de l'envoi de la requête :", error);
        }

}

async function suppImage(workId) {
    const supUrl = `${api_works}/${workId}`;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token );

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    try {
        const response = await fetch(supUrl, requestOptions);
        if (response.ok) {
            console.log('Travail supprimé avec succès.');
            const workElement = document.getElementById(`work_${workId}`);
            if (workElement) {
                workElement.remove();
            } else {
                console.error('Element DOM introuvable pour le travail ID:', workId);
            }
        } else {
            console.error ("Erreur lors de la suppression du travail. Code de réponse:", response.status);
        }
    } catch (error) {
        console.error("Erreur de l'envoi de la requête de suppression :", error);
    }
}

RecupImages("gallery", false);


let logout = document.getElementById("log");
if (token == null) {
    logout.innerHTML = "login"
} else {
    logout.innerHTML = "logout"
}

let modifier = document.getElementById("modifier");
modifier.innerHTML += `<i class="fa-solid fa-pen-to-square"></i> Modifier`;

if (token == null) {
    modifier.style.visibility = "hidden"
} else {
    modifier.style.visibility = "visible"
}


let modal = document.getElementById("myModal");
let btnModif = document.getElementById("modifier");
let close = document.getElementById("close");

btnModif.addEventListener("click", fonctionModale => {
    modal.style.display = "block";
    const imagesModale = document.getElementById("galleryModale");
    if (imagesModale.childNodes.length === 0) {
        console.log("ici")
        RecupImages("galleryModale", true)
    }
})
close.addEventListener("click", fonctionModale => {
    modal.style.display = "none";
})
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
let ajouterPhoto = document.getElementById("ajouterPhoto");
let addPhoto = document.getElementById("add_photo");
let modal1 = document.getElementById("modal1")
addPhoto.addEventListener("click", fonctionModale2 => {
    ajouterPhoto.style.display = "block";
    modal1.style.display = "none";
    console.log("ajout")
})

//Si on clique sur la flèche retour, Modale 1 display et Modale 2 hidden
let btnRetour = document.getElementById("btnRetour");
btnRetour.addEventListener("click", retourModale1 => {
    ajouterPhoto.style.display = "none";
    modal1.style.display = "block";
})

const form = document.getElementById('media_form');
form.addEventListener("submit", function (event) {
    ajoutImages();
   event.preventDefault();
})


