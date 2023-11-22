


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
