/* MENU */

const menu = document.querySelector("nav ul");
const menuLink = document.querySelectorAll("nav ul li a");

menuLink.forEach( link => link.addEventListener("click", (event) => {
  menu.querySelectorAll('a').forEach(e => e.classList.remove('current'));
  event.target.classList.add("current");
}));



/* SLIDER */

const sliderBackground = document.querySelector(".slider");
const slideContainer = document.querySelector(".slider__images");
const arrow = document.querySelectorAll(".slider .arrow");

const slides = {
  0: [`<div class="iphone iphone_vertical">
        <div class="iphone__screen iphone__clickable"></div>
        <div class="iphone__phone iphone__clickable"></div>
        <div class="iphone__shadow"></div>
       </div>`,
      `<div class="iphone iphone_horizontal">
        <div class="iphone__screen iphone__clickable"></div>
        <div class="iphone__phone iphone__clickable"></div>
        <div class="iphone__shadow"></div>
       </div>`],
  1: [`<img width="517" height="513" src="./assets/slider-images/2-iphones.png" alt="iPhone Vertical">`]
};

const slideColor = {
  0: "bg-red",
  1: "bg-blue",
  "default": "bg-red"
}

// Phone screens switching off / on
function phoneScreensActivate() {
  const phones = document.querySelectorAll(".slider .iphone");
  phones.forEach( phone => phone.querySelectorAll(".iphone__clickable").forEach( 
    element => element.addEventListener( "click", event => {
      let screen = phone.querySelector(".iphone__screen");
      (screen.classList.contains("hidden")) ?
        screen.classList.remove("hidden") :
        screen.classList.add("hidden");
    })
  ));
}
phoneScreensActivate();

let currentSlide = 0;
arrow.forEach( each => each.addEventListener("click", event => {
  ( event.target.classList.contains("left") ) ? currentSlide-- : currentSlide++;

  if (currentSlide == Object.keys(slides).length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = Object.keys(slides).length-1;
  }

  sliderBackground.classList.value = "slider home";

  if(slideColor.hasOwnProperty(currentSlide)) {
    sliderBackground.classList.add(slideColor[currentSlide]);
  } else {
    sliderBackground.classList.add( slideColor["default"] );
  }
  slideContainer.innerHTML = "";
  slides[currentSlide].forEach( img => slideContainer.innerHTML += `\n${img}`);

  phoneScreensActivate();
}));


/* PORTFOLIO */

const tags = document.querySelectorAll(".portfolio__tags button");
const portfolio = document.querySelector(".portfolio__pictures");

// Shift portfolio pictures by clicking on tag
tags.forEach(tag => tag.addEventListener("click", (event) => {
  // Prevent selected tag from click action
  if( !event.target.classList.contains("selected") ) {
    let portfolioPictures = [...portfolio.querySelectorAll(".portfolio__picture")];
    portfolioPictures.unshift(portfolioPictures.pop());
    portfolioPictures.forEach( pic => portfolio.append(pic) );
  }
  tags.forEach(t => t.classList.remove('selected'));
  event.target.classList.add("selected");
}));

// Make clicked portfolio picture bordered
let switchNow = true;
const portfolioPic = portfolio.querySelectorAll(".portfolio__picture");
portfolioPic.forEach(image => image.addEventListener("click", (event) => {
  if ( event.target.classList.contains("bordered") ) {
    switchNow = false;
  }

  portfolio.querySelectorAll("img").forEach(pic => pic.classList.remove("bordered"));
  
  if (switchNow) {
    event.target.classList.add("bordered");
  }

  switchNow = true;
}));



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
modalBackground.addEventListener("click", hideModal);