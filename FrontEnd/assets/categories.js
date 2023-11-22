
async function Bcategories() {
    const categoriesButtons = await fetch("http://localhost:5678/api/categories");
    const button = await categoriesButtons.json();
    console.log(button)
}
Bcategories()