// check if there's local storage color option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors)

  // remove active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");

    // add active class on specific item
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  })
}

// random background options
let backgroundOption = true;

// variable to randomize imgs
let backgroundInterval;

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// toggle spin class on icon
document.querySelector(".toggle-settings i").onclick = function () {
  // toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  // toggle class open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
  li.addEventListener("click", (e) => {

    // set color on root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(apan => {
  apan.addEventListener("click", (e) => {

    handleActive(e);
    if (e.target.dataset.background === "yes") {
      if (backgroundOption === false) {
        backgroundOption = true;
        randomizeImgs();
        localStorage.setItem("background_option", true);
      }
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
    
      // change background image url
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}

randomizeImgs();


// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
  img.addEventListener("click", (e) => {

    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.append(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    
    if (img.alt !== "") {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.append(imgText);
      popupBox.append(imgHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.append(popupImage);
    document.body.append(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.append(closeButtonText);
    closeButton.className = "close-button";
    popupBox.append(closeButton);
  })
})

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
})

// select all links
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSomeWhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}

scrollToSomeWhere(allBullets);

// handle active state
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// show and hidden bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  })
})

// reset button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
}

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
}

// click anywhere outside menu and goggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
})

// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
}