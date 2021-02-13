//UI elements for the username and password
const user = document.querySelector("#userField");
const pass = document.querySelector("#passField");

//Login form
const login = document.querySelector("#login-form");
login.addEventListener('submit', validateInputs);

function validateInputs(e) {
    e.preventDefault()
    var username = user.value;
    var password = pass.value;
    var validEntry = false;
    if (username == ''){
        // console.log("username empty detected");
        user.style.borderColor = "red";
        return;
    }
    if(password == '') {
        console.log("password empty detected")
        pass.style.borderColor = "red";
        return;
    }

    // open the db to match the username with the password
    let userObjects = Court.transaction("Users").objectStore("Users");
    //search using the username key
    let request = userObjects.openCursor();

    request.onsuccess = function(event){
        let cursor = event.target.result;
        var user;
        if (cursor && !validEntry){
            if (username == user.userName && password == user.password){
                user = cursor.value;
                validEntry = true;
            }
            cursor.continue();
        }
        console.log(validEntry)
        // open the relevant document by checking the userType 
    }

}