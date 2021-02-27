// extract user key from url resource key to access database
const url = new URLSearchParams(window.location.search);
let userName = sessionStorage.getItem('user');
let accessType = sessionStorage.getItem('access');

if (userName == null && accessType == null) {
  userName = url.get("user");
  accessType = url.get("access");
  if (userName == null && accessType == null) {
      window.location.href = "../redirect.html";
  }
  else {
    sessionStorage.setItem('user',userName);
    sessionStorage.setItem('access', accessType);
  }
 
}


console.log(userName);
console.log(accessType);

switch(accessType){
    case 'User': loadUserData();break;
    case 'Clerk':loadClerkData();break; 
}


function loadUserData(){
    const caseContainer = document.querySelector("#case-container");
    const welcome = document.querySelector("#welcome-header");    

    welcome.innerHTML = "Welcome " + userName + ", get on top of your active cases today";
    welcome.style.fontSize = "2rem";
    // Open the database
    let courtDB;
    let court = indexedDB.open("CourtSystem", 1);
    court.onsuccess = function(e) {
        courtDB = e.target.result;
        let userCases = courtDB.transaction("Cases").objectStore("Cases");
        
        let plaintiffIndex = userCases.index("by_plaintiff");
        let defendantIndex = userCases.index("by_defendant");

        

        let requestPlaintiff = plaintiffIndex.getAll(userName);
        let requestDefendant = defendantIndex.getAll(userName);
        requestPlaintiff.onsuccess = function() {
            if (requestPlaintiff.result != undefined) {
                let activeCases = requestPlaintiff.result;
                let userView = '';
                userView += `<div class="row"> <div class="col-sm-12"><h1 style="color:#bda35c">Filed Cases</h1></div> </div>`
                activeCases.forEach(item => {
                    userView += `
                    <div class="row">
                                <div class="card col-sm-12">
                                    <div class="card-body">
                                        <h5 class="card-title"> Case Title: ${item.plaintiff + " Vs " + item.defendant}</h5>
                                        <h6 class="card-subtitle mb-2">Case Number: ${item.caseID}</h6>
                                        <p class="card-text lead">${item.description}</p>
                                        <a href="#" class="btn btn-primary">See Detail</a>
                                    </div>
                                </div>
                    </div>                       
                    `
                });
                const parentDiv = document.createElement("div");
                parentDiv.className = "container";
                parentDiv.innerHTML = userView;
                caseContainer.appendChild(parentDiv);
                             
            }
            else {
                console.log("User is not a plaintiff in any cases")
            }
        }

        requestDefendant.onsuccess = function() {
            if (requestDefendant.result != undefined) {
                let activeCases = requestDefendant.result;
                let userView = '';
                userView += `<div class="row"> <div class="col-sm-12"><h1 style="color:#b53d35">Filed Against Cases</h1></div> </div>`
                activeCases.forEach(item => {
                    userView += `
                    <div class="row">
                                <div class="card col-sm-12">
                                    <div class="card-body">
                                        <h5 class="card-title"> Case Title: ${item.plaintiff + " Vs " + item.defendant}</h5>
                                        <h6 class="card-subtitle mb-2">Case Number: ${item.caseID}</h6>
                                        <p class="card-text lead">${item.description}</p>
                                        <a href="#" class="btn btn-primary">See Detail</a>
                                    </div>
                                </div>
                    </div>                       
                    `
                });
                const parentDiv = document.createElement("div");
                parentDiv.className = "container";
                parentDiv.innerHTML = userView;
                caseContainer.appendChild(parentDiv);               
            }
            else {
                console.log("User is not a defendant in any cases")
            }
        }
    } 
    
}

function loadClerkData(){
    

    
    let db = indexedDB.open("CourtSystem", 1);
    db.onsuccess= function(e){
    Court = e.target.result;
    let objectStore = Court.transaction("Clerks").objectStore("Clerks");
    var request = objectStore.get(userName);
    
    request.onsuccess= function(e){
        var values=e.target.result;
        let display=''

        for (var i = 0, l = values.requests.length; i < l; i++) {
            var obj = values.requests[i];
            display += `
                <div class="card" id="${i}">
                <div class="card-body">
                    <h5 class="card-title">Case${i+1}</h5>
                    <p class="card-text">Request type: ${obj.requestType}</p>
                    <p class="card-text">${obj.requested}</p>
                    <p id="defendant_name" class="card-text">Defendant name: ${obj.caseInfo[0]}</p>
                     <p id="Plaintiff_name" class="card-text">Plaintiff name: ${obj.caseInfo[1]}</p>
                    <p class="card-text">Case Type: ${obj.caseInfo[2]}</p>
                    <p class="card-text">Charge: ${obj.caseInfo[3]}</p>
                    <p id="description" class="card-text">Description: ${obj.caseInfo[4]}</p>
                    <a href="" class="accept-button btn btn-secondary">Accept</a>
                    <a href="" class="decline-button btn btn-secondary">Decline</a>
                </div>
                </div> `; 
        }
        console.log(display)
    }



    }
    
}

function clearSession(){
    sessionStorage.clear();
}