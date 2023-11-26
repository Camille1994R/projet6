
async function Bcategories() {
    const categoriesButtons = await fetch("http://localhost:5678/api/categories");
    const button = await categoriesButtons.json();
    console.log(button)



    button.forEach(element => {
        const click = element.name;

    document.getElementById("projet").innerHTML +=  `
    <div>
        <input src=${click[0]} type="submit" value="Objets"> 
        <input src=${click[1]} type="submit" value="Appartements">
        <input src=${click[2]} type="submit" value="Hotels & Restaurants"> 
    </div>
    `
    });
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
