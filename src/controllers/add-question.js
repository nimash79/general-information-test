const ipc = require("electron").ipcRenderer;

window.$ = window.jQuery = require("jquery");

window.addEventListener("DOMContentLoaded", async () => {
  ipc.send("get-categories");
  // const links = document.getElementsByTagName("a");
  // for (let i = 0; i < links.length; i++)
  // {
  //     links[i].href += `$level=${level}`;
  // }
});

ipc.on("get-categories-reply", (event, args) => {
  const { categories } = args;
  const dropdown = document.getElementsByClassName("categories-select")[0];
  categories.forEach((category) => {
    const option = `<option value="${category._id}">${category.title}</option>`;
    dropdown.innerHTML += option;
  });
});

document.getElementsByClassName("back")[0].onclick = () => {
  history.back();
};

$(".add-choice-btn").on("click", (event) => {
  const choice = document.createElement("div");
  choice.className = "choice";
  choice.innerHTML = `<input class="form-input" />
    <button type="button" class="custom-btn remove-choice-btn">Remove choice</button>`;
  const choices = document.getElementsByClassName("choices")[0];
  choices.appendChild(choice);
});

$(document).on("click", ".remove-choice-btn", (event) => {
  $(event.target).parent().remove();
});

$(".form-submit").on("click", () => {
  const level = parseInt($("#level").val());
  const categoryId = $("#category").val();
  const content_en = $("#english").val();
  const content_fa = $("#persian").val();
  const choices = [];
  const choiceElements = document.getElementsByClassName("choice");
  console.log(choiceElements);
  [...choiceElements].forEach(choice => {
    choices.push($(choice).find("input").val());
  });
  ipc.send("add-question", {
    level,
    categoryId,
    content_en,
    content_fa,
    choices,
  });
});


ipc.on("add-question-reply", (event, args) => {
    const {status} = args;
    if (status === 1) {
        alert("Question added successfully!");
        clearForm();
    }
    else alert("There was an error!");
})

const clearForm = () => {
    $("#english").val("");
    $("#persian").val("");
    $(".choice").remove();
}