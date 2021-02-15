// extract user key from url resource key to access database
const url = new URLSearchParams(window.location.search);
const userName = url.get("user");
const caseContainer = document.querySelector("#case-container");
const welcome = document.querySelector("#welcome-header");    

welcome.innerHTML = "Welcome " + userName + ", get on top of your active cases today";
welcome.style.fontSize = "2rem";

// Fetch data from the data-base and load content
function loadUserData() {
    // Open the database
    let courtDB;
    let court = indexedDB.open("CourtSystem", 1);
    court.onsuccess = function(e) {
        courtDB = e.target.result;
        let userCases = courtDB.transaction("Cases").objectStore("Cases");
        let userView = '';
        let plaintiffIndex = userCases.index("by_plaintiff");

        let request = plaintiffIndex.getAll(userName);
        request.onsuccess = function() {
            if (request.result != undefined) {
                let activeCases = request.result;
                activeCases.forEach(item => {
                    userView += `
                    <div class="row">
                                <div class="card col-12">
                                    <div class="card-body">
                                        <h5 class="card-title"> Case Title: ${item.plaintiff + " Vs " + item.defendant}</h5>
                                        <h6 class="card-subtitle mb-2">Case Number: ${item.caseID}</h6>
                                        <p class="card-text lead">${item.description}</p>
                                        <a href="" class="btn btn-primary">See Detail</a>
                                    </div>
                                </div>
                    </div>                       
                    `
                });
                caseContainer.innerHTML = userView;               
            }
            else {
                console.log("User is not a plaintiff in any cases")
            }
        }

    }   

}

loadUserData();