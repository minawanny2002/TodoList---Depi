import { t } from "./translations.js";
var signInButton;
var alertMsgSignIn;
// var signUpButton
var signInEmail;
var signInPassword;
var login;

var users;
if (localStorage.getItem("AllUsers") != null) {
  users = JSON.parse(localStorage.getItem("AllUsers"));
} else {
  users = [];
}

export function signInBtn() {
  alertMsgSignIn = document.querySelector(".alertmsg-signin");
  signInEmail = document.querySelector("#signinmail");
  signInPassword = document.querySelector("#signinpassword");
  login = document.querySelector(".login-button");
  if (!login) {
    return;
  }

  login.addEventListener("click", checkInfo);
}

function checkInfo() {
  // if (users.length == 0) {
  //   alertMsgSignIn.innerHTML = t("signin_email_not_found");
  //   return;
  // }
  for (var i = 0; i < users.length; i++) {
    if (signInEmail.value == users[i].userEmail) {
      if (signInPassword.value == users[i].userPassword) {
        localStorage.setItem("loggedInUser", JSON.stringify(users[i]));
        window.location.href = "home.html";
      } else {
        alertMsgSignIn.innerHTML = t("signin_wrong_password");
      }
    } else {
      alertMsgSignIn.innerHTML = t("signin_email_not_found");
    }
  }
}

signInBtn();
