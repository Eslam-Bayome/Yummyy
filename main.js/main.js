"use strict";

//nav
const navClick = document.getElementById("nav-click");
const goHome = document.querySelector(".home");

function closeNav() {
  $(".nav-content").animate({ width: "toggle" }, 500);
  $(".nav-log").animate({ marginLeft: "0" }, 500);
  navClick.className = "fa-solid fa-bars";
  $(".links a").each(function (i) {
    $(this)
      .delay((i + 1) * 100)
      .animate({ top: "300px", right: "300px" }, 200);
  });
}

$("#nav-click").on("click", function () {
  $(".nav-content").animate({ width: "toggle" }, 500);
  let width = $(".nav-content").css("width");
  if (parseInt(width) === 0) {
    $(".nav-log").animate({ marginLeft: "250px" }, 500);
    $(".links a").each(function (i) {
      $(this)
        .delay((i + 1) * 100)
        .animate({ top: "0px", right: "0px" }, 200);
    });
  } else {
    $(".nav-log").animate({ marginLeft: "0" }, 500);
    $(".links a").each(function (i) {
      $(this)
        .delay((i + 1) * 100)
        .animate({ top: "300px", right: "300px" }, 200);
    });
  }
});

navClick.addEventListener("click", function (e) {
  if (navClick.classList.contains("fa-bars")) {
    navClick.className = "fa-solid fa-x";
  } else {
    navClick.className = "fa-solid fa-bars";
  }
});

// =============================================================

$(document).ready(function () {
  $(".waiting").fadeOut(1000, function () {
    $("body").css("overflow", "auto");
  });
});

// =============================================================
let loadScreen = function () {
  $(".waiting").css("display", "flex").fadeOut(700);
};

// ==================================================

function closeContact() {
  usSection.classList.add("d-none");
  mealsContainer.classList.remove("d-none");
}

function allNeeded() {
  closeContact();
  loadScreen();
  formSearch.classList.add("d-none");
  closeNav();
  clearInput();
  $("body").css("overflow", "auto");
}

// ==================================================

const mealsContainer = document.querySelector("#mealsContainer");

async function getMeals(name = "") {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let mealsData = await meals.json();
  displayMeals(mealsData.meals);
}

async function getMealsByLetter(letter = "") {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let mealsData = await meals.json();
  displayMeals(mealsData.meals);
}

function displayMeals(meals) {
  let box = ``;
  if (meals == null) {
    return (mealsContainer.innerHTML = "");
  }

  for (let i = 0; i < meals.length && i < 20; i++) {
    box += ` <div class="col-md-3">
    <div class="content bg-black rounded-2 position-relative">
      <img src="${meals[i].strMealThumb}" class="w-100" alt="" />
      <div class="layout">
      <h2 data-myid="${meals[i].idMeal}">${meals[i].strMeal}</h2>
      </div>
    </div> </div>`;
  }
  mealsContainer.innerHTML = box;

  const layout = document.querySelectorAll(".layout");
  layout.forEach((lay) => {
    lay.classList.remove("flex-column");

    lay.addEventListener("click", function (e) {
      let temp = e.currentTarget.querySelector("h2");
      let id = temp.dataset.myid;
      getMealById(+id);
    });
  });
}

getMeals();

goHome.addEventListener("click", function () {
  closeContact();
  $("body").css("overflow", "auto");
  formSearch.classList.add("d-none");
  clearInput();
  getMeals();
  loadScreen();
});

// ==================================================

const searchBtn = document.getElementById("displaySearch");
const searchName = document.querySelector("#searchName");
const searchLetter = document.querySelector("#searchLetter");
const formSearch = document.querySelector("#formSearch");

searchBtn.addEventListener("click", function () {
  mealsContainer.innerHTML = "";
  formSearch.classList.remove("d-none");
  closeNav();
  closeContact();
});

searchName.addEventListener("input", function () {
  getMeals(`${searchName.value}`);
});

searchLetter.addEventListener("input", function () {
  if (searchLetter.value.length > 1) {
    searchLetter.value = searchLetter.value[0];
    getMealsByLetter(`${searchLetter.value}`);
  } else {
    getMealsByLetter(`${searchLetter.value}`);
  }
});
// ==================================================
const displayCate = document.getElementById("displayCate");

async function getCategory() {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let mealsData = await meals.json();
  displayCategory(mealsData.categories);
}

async function categoryMeals(catName) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
  );
  let mealsData = await meals.json();
  displayMeals(mealsData.meals);
}

function displayCategory(meals) {
  let box = ``;
  for (let i = 0; i < meals.length && i < 20; i++) {
    box += ` <div class="col-md-3">
    <div class="content bg-black rounded-2 position-relative">
      <img src="${meals[i].strCategoryThumb}" class="w-100" alt="" />
      <div class="layout">
      <h2>${meals[i].strCategory}</h2>
      <p>${meals[i].strCategoryDescription.slice(0, 200)}</p>
      </div>
    </div> 
    </div>`;
  }
  mealsContainer.innerHTML = box;
  const layout = document.querySelectorAll(".layout");
  layout.forEach((lay) => {
    lay.classList.add("flex-column");
    lay.addEventListener("click", function (e) {
      let temp = e.currentTarget.querySelector("h2");
      categoryMeals(temp.textContent.toLowerCase());
    });
  });
}

displayCate.addEventListener("click", function () {
  allNeeded();
  getCategory();
});

// ==================================================

const displayArea = document.getElementById("displayArea");

async function getArea() {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let mealsData = await meals.json();
  displayAllArea(mealsData.meals);
}

async function getMealsByArea(count) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${count}`
  );

  let mealsData = await meals.json();
  displayMeals(mealsData.meals);
}

function displayAllArea(meals) {
  let box = ``;
  for (let i = 0; i < meals.length && i < 20; i++) {
    box += ` <div class="col-md-3">
    <div class="content bg-black rounded-2 position-relative text-white text-center cursor">
     <i class="fa-solid fa-house-laptop fa-4x"></i>
     <p class="textArea">${meals[i].strArea}</p>
    </div> 
    </div>`;
  }
  mealsContainer.innerHTML = box;
  const para = document.querySelectorAll(".content");
  para.forEach((lay) => {
    lay.addEventListener("click", function (e) {
      let temp = e.currentTarget.querySelector(".textArea");
      getMealsByArea(temp.textContent.trim());
    });
  });
}

displayArea.addEventListener("click", function () {
  allNeeded();
  getArea();
});

// ==================================================

const displayIngre = document.getElementById("displayIngre");

async function getIngre() {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let mealsData = await meals.json();
  displayAllIngre(mealsData.meals);
}

async function getMealsByIngre(ingr) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`
  );

  let mealsData = await meals.json();
  displayMeals(mealsData.meals);
}

function displayAllIngre(meals) {
  let box = ``;
  for (let i = 0; i < meals.length && i < 20; i++) {
    box += ` <div class="col-md-3">
    <div class="content bg-black rounded-2 position-relative text-white text-center cursor">
     <i class="fa-solid fa-drumstick-bite fa-3x"></i>
     <h3 class="textArea">${meals[i].strIngredient}</h3>
     <p>${meals[i].strDescription.slice(0, 160)}</p>
    </div> 
    </div>`;
  }
  mealsContainer.innerHTML = box;
  const para = document.querySelectorAll(".content");
  para.forEach((lay) => {
    lay.addEventListener("click", function (e) {
      let temp = e.currentTarget.querySelector(".textArea");
      getMealsByIngre(temp.textContent.trim());
    });
  });
}

displayIngre.addEventListener("click", function () {
  allNeeded();
  getIngre();
});
// =============================================================

async function getMealById(id) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let mealsData = await meals.json();
  displayDeatils(mealsData.meals[0]);
}

function displayDeatils(meal) {
  loadScreen();
  formSearch.classList.add("d-none");

  let subBox = ``;
  for (let j = 1; j < 20; j++) {
    if (meal[`strIngredient${j}`]) {
      subBox += `<span class="ingredient"> ${meal[`strIngredient${j}`]}</span>`;
    }
  }

  let box = ``;

  box += `
    <div class="col-md-4">
      <div class="img-content text-white">
        <img src="${meal.strMealThumb}" class="w-100" alt="" />
        <p>Beef and Mustard Pie</p>
      </div>
    </div>
    <div class="col-md-8">
      <div class="p-content text-white">
        <h4>Instructions</h4>
        <p>
         ${meal.strInstructions}
        </p>
        <p class="p-inst">Area: ${meal.strArea}</p>
        <p class="p-inst">Category: ${meal.strCategory}</p>
        <div class="recip">
          <p class="p-inst">Recipes:</p>
          ${subBox}

      
        </div>
        <div class="source mt-2">
          <p class="p-inst">Tags:</p>
          <a href="${meal.strSource}" target="_blank" class="btn btn-sm btn-danger">Source</a>
          <a href="${meal.strYoutube}" target="_blank" class="btn btn-sm btn-success">YouTube</a>
        </div>
      </div>
</div>`;

  mealsContainer.innerHTML = box;
}

// =============================================================
// =============================================================
//validation
const validName = document.getElementById("validName");
const validPhone = document.getElementById("validPhone");
const validAge = document.getElementById("validAge");
const validPassword = document.getElementById("validPassword");
const validRePass = document.getElementById("validRePass");
const validEmail = document.getElementById("validEmail");
const rePassAlert = document.getElementById("rePassAlert");
const passAlert = document.getElementById("passAlert");
const phoneAlert = document.getElementById("phoneAlert");
const ageAlert = document.getElementById("ageAlert");
const emailAlert = document.getElementById("emailAlert");
const nameAlert = document.getElementById("nameAlert");
const btnValidation = document.getElementById("validBtn");

function clearInput() {
  validPassword.value =
    validAge.value =
    validEmail.value =
    validName.value =
    validRePass.value =
    validPhone.value =
      "";
}
btnValidation.addEventListener("click", function (e) {
  e.preventDefault();
  clearInput();
});

function validateForm() {
  if (
    myRegex(validName, /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/) &&
    myRegex(validPassword, /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) &&
    validPassword.value === validRePass.value &&
    myRegex(validEmail, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) &&
    myRegex(validAge, /^\d+$/) &&
    myRegex(validPhone, /^01[0-9]{9}$/)
  ) {
    btnValidation.removeAttribute("disabled");
  } else {
    btnValidation.setAttribute("disabled", true);
  }
}

function myRegex(input, reg) {
  let myurl = input.value;
  return reg.test(myurl);
}

validName.addEventListener("input", function () {
  if (!myRegex(validName, /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/)) {
    nameAlert.classList.remove("d-none");
  } else {
    nameAlert.classList.add("d-none");
  }
  validateForm();
});

validPhone.addEventListener("input", function () {
  if (!myRegex(validPhone, /^01[0-9]{9}$/)) {
    phoneAlert.classList.remove("d-none");
  } else {
    phoneAlert.classList.add("d-none");
  }
  validateForm();
});

validAge.addEventListener("input", function () {
  if (!myRegex(validAge, /^\d+$/)) {
    ageAlert.classList.remove("d-none");
  } else {
    ageAlert.classList.add("d-none");
  }
  validateForm();
});

validEmail.addEventListener("input", function () {
  if (
    !myRegex(validEmail, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ) {
    emailAlert.classList.remove("d-none");
  } else {
    emailAlert.classList.add("d-none");
  }
  validateForm();
});

validPassword.addEventListener("input", function () {
  if (!myRegex(validPassword, /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    passAlert.classList.remove("d-none");
  } else {
    passAlert.classList.add("d-none");
  }
  validateForm();
});

validRePass.addEventListener("input", function () {
  if (validPassword.value !== validRePass.value) {
    rePassAlert.classList.remove("d-none");
  } else {
    rePassAlert.classList.add("d-none");
  }
  validateForm();
});

// =============================================================

const contactUs = document.getElementById("contact");
const usSection = document.getElementById("us");
contactUs.addEventListener("click", function () {
  usSection.classList.remove("d-none");
  mealsContainer.classList.add("d-none");
  formSearch.classList.add("d-none");
  $("body").css("overflow", "hidden");

  closeNav();
  loadScreen();
});
