// Nav bar scroll
window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");
  var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  var nav = document.querySelector(".nav");

  // If scroll is greater than 100px or menu is expanded, add class "opaque"
  if (currentScroll > 100 || nav.classList.contains("active")) {
    navbar.classList.add("opaque");
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.add("transparent");
    navbar.classList.remove("opaque");
  }
});

//JavaScrip navigation
let menuBtn = document.querySelector(".menu-btn");
let nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");

  // Once clicked menu is expanded
  var navbar = document.getElementById("navbar");
  if (nav.classList.contains("active")) {
    navbar.classList.add("opaque");
    navbar.classList.remove("transparent");
  } else {
    // If the menu is closed, maintain standard scrolling behavior
    var currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll <= 100) {
      navbar.classList.add("transparent");
      navbar.classList.remove("opaque");
    }
  }
});

// Counting down
// Event date (format: year, month (0-11), day, hour, minute, second)
const eventDate = new Date(2027, 5, 20, 13, 30, 0);

function updateCountdown() {
  const now = new Date();
  const difference = eventDate - now;

  if (difference <= 0) {
    document.getElementById("days").innerHTML = "0";
    document.getElementById("hours").innerHTML = "0";
    document.getElementById("minutes").innerHTML = "0";
    document.getElementById("seconds").innerHTML = "0";
  } else {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = formatTimeUnit(days);
    document.getElementById("hours").innerHTML = formatTimeUnit(hours);
    document.getElementById("minutes").innerHTML = formatTimeUnit(minutes);
    document.getElementById("seconds").innerHTML = formatTimeUnit(seconds);
  }
}

function formatTimeUnit(unit) {
  return unit < 10 ? "0" + unit : unit;
}

// Call the function every second
setInterval(updateCountdown, 1000);

// First refresh of the countdown
updateCountdown();

// JavaScript Lineup
function getYear(year) {
  fetch(`/lineup/${year}`)
    .then((response) => response.json())
    .then((data) => {
      const lineupDIV = document.getElementById("lineup-results");
      lineupDIV.innerHTML = "";
      data.forEach((artist) => {
        const lineupBlock = document.createElement("div");
        lineupBlock.classList.add("lineup-block");

        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = artist.Day;
        lineupBlock.appendChild(dayDiv);

        const stageDiv = document.createElement("div");
        stageDiv.classList.add("stage");
        stageDiv.textContent = artist.Stage;
        lineupBlock.appendChild(stageDiv);

        const img = document.createElement("img");
        img.src = `/images/lineup_img/${artist.ArtistID}.jpg`; // The image filename corresponds to the Artist ID
        img.classList.add("artist-img");
        lineupBlock.appendChild(img);

        const artistNameDiv = document.createElement("div");
        artistNameDiv.classList.add("artist-name");
        artistNameDiv.textContent = artist.ArtistName;
        lineupBlock.appendChild(artistNameDiv);

        lineupDIV.appendChild(lineupBlock);
      });

      const buttons = document.querySelectorAll(".btn-year");
      buttons.forEach((button) => {
        if (button.textContent.trim() === year.toString()) {
          button.classList.add("selected");
        } else {
          button.classList.remove("selected");
        }
      });
    })
    .catch((error) => console.error("Błąd:", error));
}

// Function that handles clicking on the year button
function handleClick(year) {
  getYear(year);
}

// Call getYear() after the page loads for the year 2024
window.onload = function () {
  const lineupDIV = document.getElementById("lineup-results");
  if (lineupDIV) {
    getYear(2024);
  } else {
    console.error("Element lineup-results does not exist");
  }
};

// Check if there is an element related to the lineup button
const lineupLink = document.querySelector('a[href="/index#lineup"]');
if (lineupLink) {
  lineupLink.addEventListener("click", function (event) {
    event.preventDefault();

    // navigation bar height
    const navHeight = document.querySelector("nav").offsetHeight;

    // item to scroll
    const lineupElement = document.getElementById("lineup");

    // calculate target offset
    const scrollToPosition = lineupElement.offsetTop - navHeight;

    // scroll to item with offset
    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  });
}

// Check if there is an item related to the festZone button
const festZoneLink = document.querySelector('a[href="/index#festZone"]');
if (festZoneLink) {
  festZoneLink.addEventListener("click", function (event) {
    event.preventDefault();

    // height of the navigation bar
    const navHeight = document.querySelector("nav").offsetHeight;

    // item to scroll
    const festZoneElement = document.getElementById("festZone");

    // calculate target offset
    const scrollToPosition = festZoneElement.offsetTop - navHeight;

    // scroll to item with offset
    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  });
}

// element related to the contact button
const contactLink = document.querySelector('a[href="/index#contact"]');
if (contactLink) {
  contactLink.addEventListener("click", function (event) {
    event.preventDefault();

    // height of the navigation bar
    const navHeight = document.querySelector("nav").offsetHeight;

    // item to scroll
    const contactElement = document.getElementById("contact");

    // calculate target offset
    const scrollToPosition = contactElement.offsetTop - navHeight;

    // scroll to item with offset
    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  });
}

// Java FAQ

const faqButtons = document.querySelectorAll(".faqButton");
faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const faq = button.nextElementSibling;
    const icon = button.children[1];

    faq.classList.toggle("show");
    icon.classList.toggle("rotate");
  });
});

// Loop generating elements for about, private, terms
const pictureDiv = document.querySelector(".picture");

// picture element on the page
if (pictureDiv) {
  // array storing the image indexes used
  const usedIndexes = [];

  // loop generating 6 blocks
  for (let blockIndex = 0; blockIndex < 6; blockIndex++) {
    const block = document.createElement("div");
    block.classList.add("block");

    // loop generating 6 divs in each block
    for (let i = 0; i < 6; i++) {
      const newElement = document.createElement("div");

      // randomly add the 'circle' or 'square' class
      const isCircle = Math.random() < 0.5;
      const shapeClass = isCircle ? "circle" : "square";
      newElement.classList.add(shapeClass);

      // about 20% of the items will be images
      if (Math.random() < 0.2) {
        const img = document.createElement("img");
        let randomImageIndex;

        // randomise the new index until it is unique
        do {
          randomImageIndex = Math.floor(Math.random() * 30) + 1;
        } while (usedIndexes.includes(randomImageIndex));

        usedIndexes.push(randomImageIndex); // add an index to the array of indexes used
        img.src = `/images/lineup_img/${randomImageIndex}.jpg`; // set path to random image

        // Set the image class to the same as the container shape
        img.classList.add(shapeClass);

        newElement.appendChild(img);
      }

      block.appendChild(newElement);
    }

    pictureDiv.appendChild(block);
  }
} else {
  console.error("Element picture does not exist.");
}
