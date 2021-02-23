// Get userName from login page
var userName = username;
//Get all the information below from the database

document.addEventListener('DOMContentLoaded', () => {
    let db = indexedDB.open("CourtSystem", 1);

    db.onupgradeneeded = function(e){
        db = e.target.result;       
    };

    db.onsuccess = function(e) {

    }

    db.onerror = function() {
        console.log("Error opening database");
    }

})