import {User} from "./storage.js";
const user = document.querySelector("#userField");
const pass = document.querySelector("#passField");
const fullname = document.querySelector('#fnameField');
const reEnter = document.querySelector("#re-passField");
const signUp = document.querySelector("#sign-up-form");
const inform = document.querySelector(".inform-user");

signUp.addEventListener('submit', validateSignUp);

// Sign up form validation
function validateSignUp(e) {
    
    e.preventDefault();
    
    var username = user.value;
    var password = pass.value;
    var fullName = fullname.value;
    var reEnterPass = reEnter.value;


    let Court;
    let requestDBOpen = indexedDB.open("CourtSystem", 1);
    requestDBOpen.onsuccess = function(e) {
        Court = e.target.result;
        let transaction = Court.transaction("Users", 'readwrite');
        let userStore = transaction.objectStore("Users");
        let getRequest = userStore.get(username);
        getRequest.onsuccess = function(e) {
            // check whether userName already exists in the DB
            if (getRequest.result) {
                displayError("Username already Exists!! Please choose a unique Username");
                return;
            }

            // check whether the password and reEnter are the same
            if (password != reEnterPass) {
                displayError("Passwords do not match, Please enter matching passwords");
                return;
            }
            // If code has reached this block this means that user is ready to be created

            userStore.put(new User(username, fullName, "User", encrypt(password)));
            console.log("User added successfully");
            window.location.href = "redirect.html"
            
        }   
    }

}

function displayError(message) {
    inform.style.width = "100%";
    let par = inform.firstElementChild;
    par.style.color = "red";
    par.style.display = "block";
    par.innerHTML = message;
}

