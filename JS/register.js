import { signInBtn } from "./main.js";
import { t } from "./translations.js";
var signUpButton;
var signInButton;
var signUPFirstName;
var signUPLastName;
var signUPEmail;
var signUPPassword;
var submitRegistration;
var alertMsg;

var users;
if (localStorage.getItem("AllUsers") != null) {
  users = JSON.parse(localStorage.getItem("AllUsers"));
} else {
  users = [];
}

signUpButton = document.querySelector(".sign-up-btn");

function signUPBtn() {
  //   mainBox.innerHTML = ``;
  alertMsg = document.querySelector(".alertmsg");

  signInButton = document.querySelector(".sign-in-btn");
  signInButton.addEventListener("click", signInBtn);
  signUPFirstName = document.querySelector("#signupfirstname");
  signUPLastName = document.querySelector("#signuplastname");
  signUPEmail = document.querySelector("#signupemail");
  signUPPassword = document.querySelector("#signuppassword");
  submitRegistration = document.querySelector(".registration-btn");
  submitRegistration.addEventListener("click", saveUser);

  function saveUser() {
    if (
      validateFirstName() == true &&
      validateLastName() == true &&
      validateEmail() == true &&
      validatePassword() == true &&
      findUser() == false
    ) {
      var user = {
        firstName: signUPFirstName.value,
        lastName: signUPLastName.value,
        userEmail: signUPEmail.value,
        userPassword: signUPPassword.value,
        tasks: {
          todo: [],
          done: [],
        },
      };
      users.push(user);
      localStorage.setItem("AllUsers", JSON.stringify(users));
      alertMsg.classList.replace("text-danger", "text-success");
      alertMsg.innerHTML = t("register_success");
      clearForm();
      signInBtn();
    }
  }
}

function clearForm() {
  signUPFirstName.value = "";
  signUPLastName.value = "";
  signUPEmail.value = "";
  signUPPassword.value = "";
}

function findUser() {
  for (var i = 0; i < users.length; i++) {
    if (signUPEmail.value == users[i].userEmail) {
      alertMsg.classList.replace("text-success", "text-danger");
      alertMsg.innerHTML = t("register_email_exists");
      return true;
    }
  }

  return false;
}

function validateFirstName() {
  var regex = /^[a-zA-Z ]{3,}$/;
  if (regex.test(signUPFirstName.value)) {
    return true;
  }
  alertMsg.classList.replace("text-success", "text-danger");
  alertMsg.innerHTML = t("register_first_invalid");
  return false;
}

function validateLastName() {
  var regex = /^[a-zA-Z ]{3,}$/;
  if (regex.test(signUPLastName.value)) {
    return true;
  }
  alertMsg.classList.replace("text-success", "text-danger");
  alertMsg.innerHTML = t("register_last_invalid");
  return false;
}
function validateEmail() {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(signUPEmail.value)) {
    return true;
  }
  alertMsg.classList.replace("text-success", "text-danger");
  alertMsg.innerHTML = t("register_email_invalid");
  return false;
}

function validatePassword() {
  var regex = /^[A-Za-z\d]{8,}$/;
  if (regex.test(signUPPassword.value)) {
    return true;
  }
  alertMsg.classList.replace("text-success", "text-danger");
  alertMsg.innerHTML = t("register_password_invalid");
  return false;
}

signUPBtn();
