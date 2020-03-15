const menu = document.querySelector("nav ul");

menu.addEventListener("click", (event) => {
  menu.querySelectorAll('li a').forEach(e => e.classList.remove('current'));
  event.target.classList.add("current");

  let classForScroll = event.target.innerHTML.toLowerCase()+"";

  window.scrollTo({
    top: document.querySelector(`.${classForScroll}`).offsetTop - 89,
    behavior: 'smooth'
  });
});

/* MODAL WINDOW */

const button = document.querySelector("form button");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal__background");
const modalMessage = document.querySelector(".modal__message");

//Add Close button to modal window
function addCloseButton(node){
  node.innerHTML += "<button class='modal__close-button' type='button'>OK</button>";
  const modalCloseButton = document.querySelector(".modal__close-button");
  modalCloseButton.addEventListener("click", hideModal);
  return node;
}

//Get value from form field
function addNodeValue (node, fieldName, defaultValue = "Не заполнено", br) {
  let value = document.querySelector(node).value;
  value = (value == "") ? defaultValue : value;
  return `<p>${fieldName}: ${value}</p>`;
}

//Show modal window
function showModal () {
  modal.classList.remove("hidden");
}

//Hide modal window
function hideModal () {
  modal.classList.add("hidden");
}

//Create content of modal window
button.addEventListener("click", (event) => {
  let requiredFields = [...document.querySelectorAll("[required]")];
  let isValid = node => node.checkValidity();

  //Check if all required fields filled with valid data
  if ( requiredFields.every(isValid) ) {
    event.preventDefault();
    let message = "<p>Письмо отправлено</p>";

    message += addNodeValue("input[name='subject']",
                            "Тема",
                            "Без темы");

    message += addNodeValue("textarea[name='message']",
                            "Описание",
                            "Без описания");
    modalMessage.innerHTML = message;
    addCloseButton(modalMessage);
    showModal();
  }
});

// Add close action to modal window background
// modalBackground.addEventListener("click", hideModal);