import {Case} from "./storage.js"

// extract user key from url resource key to access database
const url = new URLSearchParams(window.location.search);
let userName = sessionStorage.getItem('user');
let accessType = sessionStorage.getItem('access');

let Court;

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
    case 'Judge':loadJudgeData();break;
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
let i=5
function loadClerkData(){
    const container = document.querySelector('#request-container');
    displayRequest()

    function displayRequest() {
    let db = indexedDB.open("CourtSystem", 1);
    db.onsuccess= function(e){
    Court = e.target.result;
    let objectStore = Court.transaction("Clerks").objectStore("Clerks");
    var request = objectStore.get(userName);
    
    request.onsuccess= function(e){
        var values=e.target.result;
        let display=''

        for (var j = 0, l = values.requests.length; j < l; j++) {
            var obj = values.requests[j];
            display += `
                <div class="card" id="${j}">
                <div class="card-body">
                    <h5 class="card-title">Case ${j+1}</h5>
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
        container.innerHTML = display;
    }

    }

    }

    container.addEventListener('click',listen)
    function listen(e){
        if (e.target.classList.contains('accept-button')){
            acceptRequest(e)    
        }
        else if(e.target.classList.contains('decline-button')){
            console.log("Are you here?");
            let requests = Court.transaction("Clerks","readwrite").objectStore("Clerks");
            requests.get(userName);
            requests.onsuccess = function(){
                var clerk = requests.result;
                var requestArray = clerk.requests;
                var this_id = AddCase.parentElement.parentElement.parentElement.getAttribute('id');
                requestArray = remover(requestArray, parseInt(this_id));
                clerk.requests = requestArray;
                requests.put(clerk);
            }
        }
    }

    function remover(array, index){
        if (array.length == 1)
            return [];
        return array.slice(0, index).concat(array.slice(index + 1, array.length));
    
    }

    function acceptRequest(e){
        e.preventDefault()
        e.target.parentElement.parentElement.innerHTML+=`
        <div class="row">
                <div class="col-md-2 pl-12">
                    <div class="form-group">
                        <label for="cDate">Set court date:</label>
                    </div>   
                </div>
                <div class="col-md-5">
                <div class="form-group">
                    <input type="text" id="cDate" placeholder="court date" class="form-control" required>
                </div>
                </div>
            </div>
            
            <div class="row">
            <div class="col-md-2 pl-12">
                <div class="form-group">
                    <label for="jname">Judge Name:</label>
                </div>   
            </div>
            <div class="col-md-5">
            <div class="form-group">
                <input type="text" id="jname" placeholder="Full name" class="form-control" required>
            </div>
            </div>
        </div>
        <div class="row">
        <div class="col-md-4 pl-auto">
            <a href="#" class="add_cases btn btn-primary">Add case</a>  
        </div>
        </div>

            `

            const AddCase=document.querySelector('.add_cases');
            const courtDate=document.querySelector('#cDate');
            const judgeName=document.querySelector('#jname');
        
            AddCase.addEventListener('click',AddToCaseFile)
        
            function AddToCaseFile(e){
                e.preventDefault()
                i++
                let index;
                let requestObject = Court.transaction("Clerks","readwrite").objectStore("Clerks");
                var request = requestObject.get(userName);
                request.onsuccess= function(e){
                var values=e.target.result;
                var this_id=AddCase.parentElement.parentElement.parentElement.getAttribute('id') 
                index=this_id       
                var val=values.requests[index]
                var caseID=`aw${i}`;
                var status = 'active';
                var plaintiff = val.caseInfo[1];            
                var defendant = val.caseInfo[0]; 
                var judge = judgeName.value;
                var caseOpened = new Date();
                var description = `${val.caseInfo[2]}:${val.caseInfo[3]}\n ${val.caseInfo[4]}` ;
                var nextCourtDate =courtDate.value;
                let caseObject = Court.transaction("Cases","readwrite").objectStore("Cases");
                var caseOpened = new Date();
                let theCase=new Case(caseID,status,plaintiff,defendant,judge,caseOpened,description,nextCourtDate)
                caseObject.add(theCase);
                values.requests.splice(index,1)
                let requestObject2 = Court.transaction("Clerks","readwrite").objectStore("Clerks");
                var request2 = requestObject.put(values);
                request2.onsuccess= function(e){}
                displayRequest()
            }
        }
    }
}

function loadJudgeData(){
    // Get username from login page
    var username = userName;
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

            let j1 = indexed.getAll(username);
            j1.onsuccess = function(event){
                let judgeCase = event.target.result;
                for(let i = 0; i < judgeCase.length; i++){
                    let x , y;
                    if((judgeCase[i]).status === 'active'){
                        y = 'disabled';
                    }else{
                        x = 'disabled';
                    }
                    var div = document.createElement('div');
                    div.setAttribute('class', 'card container');
                    div.innerHTML = `
                        <div class="card-body">
                            <h5 class='card-title'>Case-${(judgeCase[i]).caseID}</h5>
                            <p class='card-text'>${(judgeCase[i]).description}</p>
                            <button class="btn btn-info btn-lg " id="btnclose${i}" ${x}>Close Case</button>
                            <button class="btn btn-info btn-lg " id="btnreopen${i}" ${y}>Re-open Case</button>
                        </div>
                    `;
                    document.getElementById('body').appendChild(div);
                }
                var closeCaseButton, reopenCaseButton;
                for(let i = 0; i < judgeCase.length; i++){
                    closeCaseButton = document.getElementById(`btnclose${i}`);
                    reopenCaseButton = document.getElementById(`btnreopen${i}`);
                    
                    adds(closeCaseButton, reopenCaseButton, i);
                }
                function adds(closeCaseBtn, reopenCaseBtn, ind){
                    closeCaseBtn.addEventListener('click', () => {
                        console.log(closeCaseBtn.id + " clicked");
                        closeCaseBtn.disabled = true;
                        reopenCaseBtn.disabled = false;
                        (judgeCase[ind]).status = 'closed';
                        let tx2 = jg.transaction("Cases","readwrite");
                        let store2 = tx2.objectStore("Cases");
                        var updateTitleRequest = store2.put(judgeCase[ind]);
                        updateTitleRequest.onsuccess = function(e){
                            console.log("The transaction that originated this request is " + updateTitleRequest.transaction);
                        }
                        myFunction("closesnackbar",(judgeCase[ind]).caseID);
                    });
                    reopenCaseButton.addEventListener('click', () => {
                        console.log(reopenCaseBtn.id + " clicked");
                        closeCaseBtn.disabled = false;
                        reopenCaseBtn.disabled = true;
                        (judgeCase[ind]).status = 'active';
                        let tx2 = jg.transaction("Cases","readwrite");
                        let store2 = tx2.objectStore("Cases");
                        var updateTitleRequest = store2.put(judgeCase[ind]);
                        updateTitleRequest.onsuccess = function(e){
                            console.log("The transaction that originated this request is " + updateTitleRequest.transaction);
                        }
                        myFunction("reopensnackbar",(judgeCase[ind]).caseID);
                    });
                }
            }
        }

        db.onerror = function() {
            console.log("Error opening database");
        }

    });
}

function clearSession(){
    sessionStorage.clear();
}

function myFunction(id, caseno) {
	var x = document.getElementById(id);
    var y = `Case ${caseno} `
    x.innerHTML =  y + x.innerHTML;
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}