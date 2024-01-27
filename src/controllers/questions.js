const ipc = require("electron").ipcRenderer;

document.getElementsByClassName("back")[0].onclick = () => {
    history.back();
}

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const level = params.get('level');
    const categoryTitle = params.get('categoryTitle');
    document.getElementsByClassName("category")[0].innerHTML = `
    <img src="assets/${categoryTitle}.png" />
    <p>${categoryTitle}</p>`;
    ipc.send("get-question", {categoryTitle, level});

    let time = 0;
    if (level === "1") time = 10;
    else if (level === "2") document.getElementById("timer").style.display = "none";
    else if (level === "3") time = 8;
    document.getElementById("timer").innerText = time;
})

ipc.on("get-question-reply", (event, args) => {
    const question = args;
    let content = `<p>${question.content_en}</p>`;
    if (question.level === 3) {
        content += `<div class="question-choices">`;
        let i = 1;
        question.choices.forEach(choice => {
            content += `<p>${i}. ${choice}</p>`;
            i++;
        })
        content += `</div>`;
    }
    content += `</div>`;
    
    document.getElementsByClassName("question")[0].innerHTML = content;
    document.getElementsByClassName("question")[1].innerHTML = `<p>${question.content_fa}</p>`;
})

  
document.addEventListener("keydown", function(event) {
    if (event.key === "t") {
        document.getElementsByTagName("body")[0].style.background = "green";
        document.getElementById("win").play();
    }
    if (event.key === "f") {
        document.getElementsByTagName("body")[0].style.background = "red";
        document.getElementById("wrong").play();
    }
    if (event.key === " ") {
        const timer = document.getElementById("timer");
        let time = parseInt(timer.innerText);
        time--;
        document.getElementById("timer").innerText = time;
        if (time !== 0) {
            const intervalId = setInterval(() => {
                time--;
                document.getElementById("timer").innerText = time;
                const body = document.getElementsByTagName("body")[0];
                if (time === 0) {
                    clearInterval(intervalId);
                    if (body.style.background != "red"
                    && body.style.background != "green") {
                        body.style.background = "yellow";
                        document.getElementById("finish").play();
                    }
                }
            }, 1000)
        }
    }
});