
async function Bcategories() {
    const categoriesButtons = await fetch("http://localhost:5678/api/categories");
    const button = await categoriesButtons.json();
    console.log(button)

    button.forEach(buttonVar => {
        const name = buttonVar.name;
        const id = buttonVar.id;
        console.log(id);

        document.getElementById("filters").innerHTML += `
            
            <input type="submit" value="${name}" id="${id}"> 
            
        `
        let buttonElement = document.getElementById(id);
        buttonElement.addEventListener("click", kaban);
        buttonElement.id = id;
    });
}
Bcategories()

async function kaban(event) {
    const reponse = await fetch("http://localhost:5678/api/works");
    let projet = await reponse.json();
    console.log(projet)
    console.log(event.target.id)

    if (event != null) {
        projet = projet.filter((imageProjet) => imageProjet.categoryId == event.target.id)
    }


    document.getElementById("gallery").innerHTML = ` `
    projet.forEach(element => {
        console.log(element)
        const image = element.imageUrl;
        const title = element.title;

        document.getElementById("gallery").innerHTML += `
        <figure>
				<img src="${image}" alt="${title}">
				<figcaption>${title}</figcaption>
		</figure>
        `;

        console.log(image + "  " + title)
    });


}
kaban()
