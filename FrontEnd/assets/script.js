
async function Bcategories() {
    const categoriesButtons = await fetch("http://localhost:5678/api/categories");
    const button = await categoriesButtons.json();
    console.log(button)

   let bodyButton =  `
        <input type="submit" value="Tous" id="Tous">
        <input type="submit" value="Objets" id="Objets">
        <input type="submit" value="Appartements" id="Appartements">
        <input type="submit" value="Hôtels & restaurants" id="Hôtels & restaurants">

   `
    let filterButton = document.getElementById("filters");
    filterButton.innerHTML = bodyButton;

}
Bcategories()

async function kaban() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const projet = await reponse.json();
    console.log(projet)

    projet.forEach(element => {
        const image = element.imageUrl;
        const title = element.title;

        document.getElementById("gallery").innerHTML +=  `
        <figure>
				<img src="${image}" alt="${title}">
				<figcaption>${title}</figcaption>
		</figure>
        `;

        console.log(image + "  " + title)
    });


}
kaban()