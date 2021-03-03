import {encrypt, isUpperCase} from "./storage.js"

//UI elements for the username and password

const user = document.querySelector("#userField");
const pass = document.querySelector("#passField");
const inform = document.querySelector(".inform-user");

//Login form
const login = document.querySelector("#login-form");

login.addEventListener('submit', validateInputs);


function validateInputs(e) {
    e.preventDefault();
    var username = user.value;
    var password = pass.value;
 
    // open the db to match the username with the password
    let Court;
    let requestDBOpen = indexedDB.open("CourtSystem", 1);
    requestDBOpen.onsuccess = function(e) {
        Court = e.target.result;
        
        let transaction = Court.transaction(["Users", "Clerks", "Judges"])
        let userRequest = transaction.objectStore("Users").getAll();
        let clerkRequest = transaction.objectStore("Clerks").getAll();
        let judgeRequest = transaction.objectStore("Judges").getAll();

        userRequest.onsuccess = function(e) {
            var result;
            if(result = searchArray(userRequest.result, username, encrypt(password))){
                Court.close();
                window.location.href = "./End_user_UI/cases.html?user="+username+"&access="+result; 
            }
            displayError("Unable to log in to system, please check your inputs!");
        }

        clerkRequest.onsuccess = function(e) {
            var result;
            if (result = searchArray(clerkRequest.result, username, encrypt(password))){
                Court.close();
                window.location.href = "./Clerk_UI/Pending.html?user="+username+"&access="+result;
            }
            displayError("Unable to log in to system, please check your inputs!");
        }

        judgeRequest.onsuccess = function(e) {
            var result;
            if (result = searchArray(judgeRequest.result, username, encrypt(password))){
                Court.close();
                window.location.href = "./Judge_UI/judge.html?user="+username+"&access="+result;
            }
            displayError("Unable to log in to system, please check your inputs!");
        }
                 
    }

}




function searchArray(objectArr, username, password) {
    let accessType;
    for (let i = 0; i < objectArr.length;i++) {
        if (objectArr[i].userName == username && objectArr[i].password == password) {
            accessType = objectArr[i].accessType;
            break;
        }
    }
    return accessType;
}

function displayError(message) {
    inform.style.width = "100%";
    let par = inform.firstElementChild
    par.style.color = "red"
    par.style.display = "block"
    par.innerHTML = message;
}



