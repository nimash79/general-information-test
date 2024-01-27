const ipc = require("electron").ipcRenderer;

window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const level = params.get('level');
    document.getElementsByClassName("header")[0].innerText = `LEVEL ${level}`;
    ipc.send("get-categories");
    // const links = document.getElementsByTagName("a");
    // for (let i = 0; i < links.length; i++)
    // {
    //     links[i].href += `$level=${level}`;
    // }
})

ipc.on("get-categories-reply", (event, args) => {
    const {categories} = args;
    const params = new URLSearchParams(window.location.search);
    const level = params.get('level');
    const sections = document.getElementsByClassName("sections")[0];
    categories.forEach(category => {
        const element = `<a href="questions.html?categoryTitle=${category.title}&level=${level}">
            <img src="assets/${category.title}.png" />
            ${category.title}
            </a>`;
        sections.innerHTML += element;
    })
})

document.getElementsByClassName("back")[0].onclick = () => {
    history.back();
}