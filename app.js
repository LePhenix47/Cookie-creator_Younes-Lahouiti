const inputNameElement = document.querySelector(".main__input-name");
const inputValueElement = document.querySelector(".main__input-value");

const inputElements = document.querySelectorAll(".main__input"); //⚠ Returns a NodeList and not an HTMLCollection
let inputElementsArray = Array.from(inputElements);

const cookieCardsContainer = document.querySelector(
  ".main__cookie-cards-container"
);

const createButton = document.querySelector(".main__button-create");
const showButton = document.querySelector(".main__button-show");

let nameOfCookieInput = "";
let valueOfCookieInput = "";

inputNameElement.addEventListener("change", function (e) {
  nameOfCookieInput = this.value;
  if (e.type === "invalid" || e.target.value === "") {
    e.target.setCustomValidity("Please fill in this field to create a cookie");
  }
});
inputValueElement.addEventListener("change", function (e) {
  valueOfCookieInput = this.value;
  if (e.type === "invalid" || e.target.value === "") {
    e.target.setCustomValidity("Please fill in this field to create a cookie");
  } else if (e.type === "change" || e.target.value !== "") {
    e.target.setCustomValidity("");
  }
});

createButton.addEventListener("click", createCookie);

function createCookie() {
  if (!nameOfCookieInput || !valueOfCookieInput) {
    return;
  }

  let nextWeek = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
  document.cookie = `${nameOfCookieInput}=${valueOfCookieInput}; expires="${nextWeek}"`;
  alert(
    `The cookie: "${nameOfCookieInput}" = "${valueOfCookieInput}" has been SUCCESSFULLY created and stored in the cookie web storage!\n\nIt will expire in a week or the: ${nextWeek}
    `
  );
}

showButton.addEventListener("click", showCookies);

let cookieCardHTMLTemplate = "";

let cookiesArray = [];
let uniqueCookiesArray = [];

function showCookies() {
  if (cookieCardsContainer.children.length) {
    //If the container has cards → Remove all the cards inside of it
    cookieCardsContainer.textContent = "";
  }
  let cookies = document.cookie;
  if (!cookies) {
    alert("You do not have any cookies!");
    return;
  }

  let arrayOfCookies = cookies.split(";");

  //   let namesOfCookies = arrayOfCookies.map((cookie) => {
  //     return cookie.split("=")[0];
  //   });

  //   let valuesOfCookies = arrayOfCookies.map((cookie) => {
  //     return cookie.split("=")[1];
  //   });

  //   console.group("arrayOfCookies");
  //   console.table(arrayOfCookies);
  //   console.groupEnd("arrayOfCookies");

  //   console.group("namesOfCookies");
  //   console.table(namesOfCookies);
  //   console.groupEnd("namesOfCookies");

  //   console.group("valuesOfCookies");
  //   console.table(valuesOfCookies);
  //   console.groupEnd("valuesOfCookies");

  for (cookieElement of arrayOfCookies) {
    createCookieCardsInHTML(cookieElement);
  }
}

function createCookieCardsInHTML(cookie) {
  let name = cookie.split(";")[0].split("=")[0];
  let value = cookie.split(";")[0].split("=")[1];

  /*
   Template: 
      <div class=" cookie-card">
        <p class="cookie-card__name">Name: <span>${}</span></p>
        <p class="cookie-card__value">Value: <span>${}</span></p>
        <button class="cookie-card__button"></button>
      </div> 
  */

  let cookieCardElement = document.createElement("div");
  cookieCardElement.classList.add("cookie-card");
  cookieCardElement.setAttribute("data-cookie-name", name);

  let cookieNameParagraphElement = document.createElement("p");

  cookieNameParagraphElement.classList.add("cookie-card__name");
  cookieNameParagraphElement.textContent = "Name: ";

  let cookieSpanNameElement = document.createElement("span");
  cookieSpanNameElement.textContent = `${name}`;

  cookieNameParagraphElement.appendChild(cookieSpanNameElement);

  let cookieValueParagraphElement = document.createElement("p");
  cookieValueParagraphElement.classList.add("cookie-card__value");
  cookieValueParagraphElement.textContent = "Value: ";

  let cookieSpanValueElement = document.createElement("span");
  cookieSpanValueElement.textContent = `${value}`;
  cookieValueParagraphElement.appendChild(cookieSpanValueElement);

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("cookie-card__button");
  deleteButton.setAttribute("type", "button");

  cookieCardElement.appendChild(cookieNameParagraphElement);
  cookieCardElement.appendChild(cookieValueParagraphElement);
  cookieCardElement.appendChild(deleteButton);

  cookieCardsContainer.appendChild(cookieCardElement);

  deleteButton.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    document.cookie = `${name}=${value}; expires=${new Date(0)}`;
  });
}
