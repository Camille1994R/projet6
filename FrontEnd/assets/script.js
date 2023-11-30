
console.log("teste")
async function Bcategories() {
    const categoriesButtons = await fetch("http://localhost:5678/api/categories");
    const buttonCategory = await categoriesButtons.json();
    
    buttonCategory.forEach(category => {
        
        let bodyButton = `<input type="submit" value="${category.name}" class="bodyButton">`;
       let filterButton = document.getElementById("filters");
       filterButton.innerHTML += bodyButton;
    })


    //quand je click sur hôtel, relie à Userid hôtal

    let tousLesBoutons = document.querySelectorAll(".bodyButton"); 
    tousLesBoutons.forEach(bouton =>  {
        bouton.addEventListener("click", function () {
        const boutonId = bouton.getAttribute("value") //récupérer la valeur des boutons 
            console.log("j'ai cliqué", boutonId);
        const galleryItem = document.querySelectorAll(".gallery figure"); //récupère les figures des images
        
        const filtrerMaGalerie = galleryItem.filter((items) => items.category.name = "Objets");
        console.log(filtrerMaGalerie);
        galleryItem.forEach(item => {
            console.log(item.getAttribute("id"));
            if(item.getAttribute("id").includes(boutonId)){
                item.style.display = "block";
            }else{
                item.style.display = "none";
            }
        });
        });
    });



}
Bcategories()


//projet -> userId = button -> id

//changer les couleurs

//function changeCss() {


//}

//récupérer les images via JS

async function kaban() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const projet = await reponse.json();
    

    projet.forEach(element => {
        const image = element.imageUrl;
        const title = element.title;
        const category = element.category.name;

        document.getElementById("gallery").innerHTML += `
        <figure id="${category}">
				<img src="${image}" alt="${title}" >
				<figcaption>${title}</figcaption>
		</figure>
        `;

        
    });


}
kaban()