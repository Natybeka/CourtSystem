// Get userName from login page
var userName = username;
//Get all the information below from the database

document.addEventListener('DOMContentLoaded', () => {
    let db = indexedDB.open("CourtSystem", 1);

    db.onupgradeneeded = function(e){
        db = e.target.result;       
    };

    db.onsuccess = function(e) {
        let jg = db.result;
        let tx = jg.transaction("Cases","readwrite");
        let store = tx.objectStore("Cases");
        let indexed = store.index("by_judge")

        let j1 = indexed.getAll(userName);
        j1.onsuccess = function(event){
            let judgeCase = event.target.result;
            for(let i = 0; i < judgeCase.length; i++){
                let x , y;
                if((judgeCase[i]).status === 'active'){
                    y = 'disabled';
                }else{
                    x = 'disabled';
                }
            }
        }
    }

    db.onerror = function() {
        console.log("Error opening database");
    }

})