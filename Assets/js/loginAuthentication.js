//UI elements for the username and password
const user = document.querySelector("#userField");
const pass = document.querySelector("#passField");
const inform = document.querySelector(".inform-user");
//Login form
const login = document.querySelector("#login-form");
login.addEventListener('submit', validateInputs);

function validateInputs(e) {
    e.preventDefault()
    var username = user.value;
    var password = pass.value;
    var validEntry = false;
    // if (username == ''){
    //     // console.log("username empty detected");
    //     user.style.borderColor = "red";
    //     return;
    // }
    // if(password == '') {
    //     console.log("password empty detected")
    //     pass.style.borderColor = "red";
    //     return;
    // }

    // open the db to match the username with the password
    
    let userObjects = Court.transaction("Users").objectStore("Users");
    //search using the username key
    let request = userObjects.openCursor();

    request.onsuccess = function(event){
        let cursor = event.target.result;
        var user;
        if (cursor && !validEntry){
            user = cursor.value;
            // Password crosschecked with username
            if (username == user.userName && password == user.password){
                validEntry = true;
            }
            else {
                cursor.continue();    
            }
        }

        if (validEntry) {
            // Give access based on the accessType Attribute
            // if (user.accessType == "User"){
            //     location = "Untracked.html";
            // }
        }


        // else login failed inform the user to check the inputs
        else {
            inform.style.width = "100%";
            let par = inform.firstElementChild
            par.style.color = "red"
            par.style.display = "block"
            par.innerHTML = "Unable to log in to system, please check your inputs!";
        } 
        console.log(validEntry)
        // open the relevant document by checking the userType 
    }

}