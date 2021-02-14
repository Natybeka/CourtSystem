// extract user key from url resource key to access database
const url = new URLSearchParams(window.location.search);
const userName = url.get("user");




// Fetch data from the data-base and load content
function loadUserData() {
    // Open the database
    let courtDB;
    let court = indexedDB.open("CourtSystem", 1);
    court.onsuccess = function(e) {
        courtDB = e.target.result;
        console.log("database opened");
        let userCases = courtDB.transaction("Cases").objectStore("Cases");
        let userView = '';
    
        let cursor = userCases.openCursor();
        cursor.onsuccess = function(e) {
            let cursor = e.target.result;
            var activeCases = [];
            if (cursor) {

                // Search for cases the user is involved in
                // First handle plaintiff side then move on to defendant side
                var caseObject = cursor.value;
                
                if (caseObject.plaintiff == userName && caseObject.status == "active") {
                    //First track only active cases then idea can be extended
                    activeCases.push(caseObject);
                }
                cursor.continue();
            }

            if (activeCases) {
                console.log(activeCases)
            }
            else {
                console.log("No active cases found");
            }

            console.log("cursor closed")
        }

    }

    

}

loadUserData();