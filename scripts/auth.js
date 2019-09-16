const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const logout = document.querySelector("#logout");
const google = document.querySelector("#google");
const facebook = document.querySelector("#facebook");

// signup
const signupUser = event => {
  event.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
};

// logout
const logoutUser = event => {
  event.preventDefault();
  auth.signOut().then(() => {
    console.log("user signed out");
  });
};

// login
const loginUser = event => {
  event.preventDefault();

  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
};

const googleAuth = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;
      const { displayName, email, phoneNumber, photoURL, ...others } = user;
      const userDetails = {
        displayName,
        email,
        phoneNumber,
        photoURL
      };
      console.log(">>>", userDetails);
    })
    .catch(function(error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
};

const facebookAuth = () => {
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then(function(result) {
      console.log(">>>>>", result);
      const token = result.credential.accessToken;
      const user = result.user;
      const { displayName, email, phoneNumber, photoURL, ...others } = user;
      const userDetails = {
        displayName,
        email,
        phoneNumber,
        photoURL
      };
      console.log(">>>", userDetails);
    })
    .catch(function(error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
};

signupForm.addEventListener("submit", signupUser);
loginForm.addEventListener("submit", loginUser);
logout.addEventListener("click", logoutUser);
google.addEventListener("click", googleAuth);
facebook.addEventListener("click", facebookAuth);
