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
            <div class="image-container">
                <img src="${urlImage}" alt="${titleImage}" >
                <div class="delete-container">
                    <a href="#" class="delete" id=${imageId}><i class="fa-solid fa-trash-can"></i></a>
                </div>
                <figcaption>${titleImage}</figcaption>
            </div>
        </figure>
        `;
    });

    worksjson.forEach(work => {
        uniqueCategories.add(work.category.name);
    });

    /*Mise en place du bouton supprimé sur les images */
    const buttonDeleteList = document.querySelectorAll(".delete");

    buttonDeleteList.forEach(buttonDelete => {
        
        buttonDelete.addEventListener("click", () => {
            console.log("buttonDelete",buttonDelete.id)
            const workId = buttonDelete.id;
            console.log("workId1",workId)
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
        buttonCategory.addEventListener("click", function () {

            const buttonCategoryValue = buttonCategory.getAttribute("value");

            const imageGallery = document.querySelectorAll(".gallery figure");

            const imagesGalleryFiltre = Array.from(imageGallery).filter(item => {
                return item.getAttribute("name") === buttonCategoryValue;
            });


            imageGallery.forEach(item => {
                if (imagesGalleryFiltre.includes(item) || buttonCategoryValue === "Tous") {

                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

async function ajoutImages() {
    const token = localStorage.getItem("jwt");
    const imageInput = document.getElementById("image");
    const imageFile = imageInput.files[0];

    const titreInput = document.getElementById("title");
    const titre = titreInput.value;

    const categoryInput = document.getElementById("category");
    const categoryId = categoryInput.value;

    let formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", titre);
    formData.append("category", categoryId);

  

    const res = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
        }
       
    })


    /* Mise en place de la preview avant l'upload */
        function showPreview(event) {
            if(event.target.files.length> 0) {
                let src = URL.createObjectURL(event.target.files[0]);
                let preview = document.getElementById("image");
                preview.src = src ;
                preview.style.display="block";
            }
        }
        showPreview()


    if (res.status === 201) {
        console.log("ca marche")
    }

}

async function suppImage(workId) {
    const token = localStorage.getItem("jwt");
    const supUrl = `http://localhost:5678/api/works/${workId}`;
console.log(supUrl)
console.log("workId", workId)

    const requestOptions = {
        method: 'DELETE',
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
        },

        
    };
    try {
        const response = await fetch(supUrl, requestOptions);
        if (response.ok) {
            ;
            const workElement = document.getElementById(`work_${workId}`);
            if (workElement) {
                workElement.remove();
            } else {
                console.error('Element DOM introuvable pour le travail ID:', workId);
            }
        } else {
            console.error("Erreur lors de la suppression du travail. Code de réponse:", response.status);
        }
    } catch (error) {
        console.error("Erreur de l'envoi de la requête de suppression :", error);
    }
}

RecupImages("gallery", false);

/*Display ou non en fonction de si on est connecté */
let logout = document.getElementById("log");
if (token == null) {
    logout.innerHTML = "login"
} else {
    logout.innerHTML = "logout"
}

let blackBox = document.getElementById("blackBox");
blackBox.innerHTML += `<i class="fa-solid fa-pen-to-square"></i>  Mode édition`;
if (token == null){
    blackBox.style.visibility = "hidden"
} else {
    blackBox.style.visibility = "visible"
}


let modifier = document.getElementById("modifier");
modifier.innerHTML += `<i class="fa-solid fa-pen-to-square"></i> Modifier`;

if (token == null) {
    modifier.style.visibility = "hidden"
} else {
    modifier.style.visibility = "visible"
}

/*Mise en place des boutons pour ouvrir et fermer la modale */

let modal = document.getElementById("myModal");
let btnModif = document.getElementById("modifier");
let close = document.getElementById("close");

btnModif.addEventListener("click", fonctionModale => {
    modal.style.display = "block";
    const imagesModale = document.getElementById("galleryModale");
    if (imagesModale.childNodes.length === 0) {
        RecupImages("galleryModale", true)
    }
})
close.addEventListener("click", fonctionModale => {
    modal.style.display = "none";
})
window.onclick = function (event) {
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
})

/*Passer de la modale 2 à la première */
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


