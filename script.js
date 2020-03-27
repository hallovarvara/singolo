/* MENU */

const menuLinks = document.querySelectorAll("nav ul li a");

document.addEventListener("scroll", changeMenuActiveLink);
window.onload = changeMenuActiveLink();

function changeMenuActiveLink(event) {
  const pageHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  const clientScreenHeight = document.documentElement.clientHeight;
  const clientTopPosition = window.pageYOffset;
  const clientBottomPosition = clientScreenHeight + clientTopPosition;

  const currentPositionY = window.scrollY;
  const tagsWithId = document.querySelectorAll('[id]');

  tagsWithId.forEach( tag => {
    if (tag.offsetTop - 90 <= currentPositionY &&
       (tag.offsetTop + tag.offsetHeight - 90) > currentPositionY) {
      menuLinks.forEach( link => {
        link.classList.remove("current");
        if(clientBottomPosition + 10 >= pageHeight) {
          menuLinks[menuLinks.length - 1].classList.add("current");
        } else {
          if (tag.getAttribute("id") === link.getAttribute("href").substring(1)) {
            link.classList.add("current");
          }
        }
      });
    }
  });
  
}

const burger = document.querySelector(".header__burger");
const header = document.querySelector("header");
const h1 = document.querySelector("h1");
const nav = header.querySelector("nav");
let menuOpened = false;
darkenContent(header);
const headerBackground = header.querySelector(".dark-background");
hideDarkBackground();

function drawMenu() {
  if (document.documentElement.clientWidth >= 768) {
    menuOpened = true;
  }
  if(menuOpened) {
    hideDarkBackground();
    burger.classList.remove("rotated90");
    h1.classList.remove("to-left");
    nav.classList.remove("to-right");
  } else {
    showDarkBackground();
    burger.classList.add("rotated90");
    h1.classList.add("to-left");
    nav.classList.add("to-right");
  }
  menuOpened = !menuOpened;
}

function hideDarkBackground(){
  if(!headerBackground.classList.contains("transparent")) {
    headerBackground.classList.add("transparent");
  }
}

function showDarkBackground(){
  if(headerBackground.classList.contains("transparent")) {
    headerBackground.classList.remove("transparent");
  }
}

burger.addEventListener("click", drawMenu);
headerBackground.addEventListener("click", drawMenu);

window.addEventListener("resize", () => {
  if(document.documentElement.clientWidth >= 768) {
    drawMenu();
  }
});

menuLinks.forEach(link => link.addEventListener("click", e => {
  if(document.documentElement.clientWidth < 768) {
    setTimeout(drawMenu, 1100);
  }
}));


/* SLIDER */

const slides = {
  0: `<div class="iphone iphone_vertical">
        <div class="iphone__screen iphone__clickable"></div>
        <div class="iphone__phone iphone__clickable"></div>
        <div class="iphone__shadow"></div>
       </div>
      <div class="iphone iphone_horizontal">
        <div class="iphone__screen iphone__clickable"></div>
        <div class="iphone__phone iphone__clickable"></div>
        <div class="iphone__shadow"></div>
       </div>`,
  1: `<img width="517" height="513" src="./assets/slider-images/2-iphones.png" alt="iPhone Vertical">`
};

const slideColor = {
  0: "bg-red",
  1: "bg-blue",
  "default": "bg-red"
}

const sliderBackground = document.querySelector(".slider");
let slidesContainer = document.querySelector(".slider__images");
const arrow = document.querySelectorAll(".slider .arrow");
let currentSlide = 0;
let slidesNumber = Object.keys(slides).length;

// Init slider
initSlider(currentSlide);
function initSlider(currentSlide) {
  slidesContainer.innerHTML = "";
  for (let i = 0; i < slidesNumber; i++) {
    let slide = document.createElement("div");
    slide.innerHTML = slides[i];
    slide.classList = "slide";
    if (i == currentSlide) slide.classList.add("active");
    slidesContainer.append(slide);
  }
  phoneScreensActivate();
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

// Slider actions
let slidesList = slidesContainer.querySelectorAll(".slide");

function hideSlide(direction) {
  slidesList[currentSlide].classList.add(direction);
  slidesList[currentSlide].addEventListener("animationend", function(){
    this.classList.remove("active", direction);
  });
}

function showSlide(direction) {
  slidesList[currentSlide].classList.add("next", direction);
  slidesList[currentSlide].addEventListener("animationend", function(){
    this.classList.remove("next", direction);
    this.classList.add("active");
  });
}

function changeSlideBackground(){
  sliderBackground.classList.value = "slider";
  if(slideColor.hasOwnProperty(currentSlide)) {
    sliderBackground.classList.add(slideColor[currentSlide]);
  } else {
    sliderBackground.classList.add( slideColor["default"] );
  }
}

arrow.forEach( each => each.addEventListener("click", event => {
  if ( event.target.classList.contains("left") ) {
    hideSlide("to-right");
    currentSlide = (--currentSlide + slidesNumber) % slidesNumber;
    changeSlideBackground();
    showSlide("from-left");
  } else {
    hideSlide("to-left");
    currentSlide = (++currentSlide + slidesNumber) % slidesNumber;
    changeSlideBackground();
    showSlide("from-right");
  }
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
const modalMessage = document.querySelector(".modal__message");

// Add dark background
function darkenContent(node, onClickCallback = false){
  if(node.querySelector(".dark-background") === null) {
    let background = document.createElement("div");
    background.classList.add("dark-background");
    node.append(background);
    if (onClickCallback) {
      node.querySelector(".dark-background").addEventListener("click", onClickCallback);
    }
  }
  return node;
}

// Add Close button to modal window
function addCloseButton(node){
  node.innerHTML += "<button class='modal__close-button' type='button'>OK</button>";
  const modalCloseButton = document.querySelector(".modal__close-button");
  modalCloseButton.addEventListener("click", hideModal);
  return node;
}

// Get value from form field
function addNodeValue (node, defaultValue = "Не заполнено") {
  let value = document.querySelector(node).value;
  value = (value == "") ? defaultValue : value;
  return value;
}

// Show modal window
function showModal () {
  modal.classList.remove("hidden");
}

// Hide modal window
function hideModal () {
  modal.classList.add("hidden");
  document.forms[0].reset();
}

// Create content of modal window
button.addEventListener("click", (event) => {
  let requiredFields = [...document.querySelectorAll("[required]")];
  let isValid = node => node.checkValidity();

  // Check if all required fields filled with valid data
  if ( requiredFields.every(isValid) ) {
    event.preventDefault();

    modalMessage.innerHTML = "";
    let title = document.createElement("p");
    title.innerText = "Письмо отправлено";
    let subject = document.createElement("p");
    subject.innerText = "Тема: " + addNodeValue("input[name='subject']", "Без темы");
    let description = document.createElement("p");
    description.innerText = "Описание: " + addNodeValue("textarea[name='message']", "Без Описания");
    modalMessage.append(title, subject, description);
    addCloseButton(modalMessage);
    darkenContent(modal, hideModal);
    showModal();
  }
});