import {Request} from "./storage.js"
const fileButton = document.querySelector("#file");
const form = document.querySelector('#request-form');
const confirm = document.querySelector('#confirmation');
const formContainer = document.querySelector('#formContainer');


fileButton.addEventListener('click', addRequest);

let userName = sessionStorage.getItem("user");

function addRequest(e) {

    e.preventDefault();
    var defendantName = document.getElementById("dname").value;
    var plaintiffName = document.getElementById("pname").value;
    var caseType = document.querySelector("#case-type-selector").value;
    var charge = document.querySelector("#charge").value;
    var description = document.querySelector("#description").value;

    if (defendantName,plaintiffName,caseType,charge,description == "") {
        console.log("Please fill all the fields")
        return;
    }

    let caseRequest = new Request("open-case", userName, [defendantName, plaintiffName, caseType, charge, description]);
    
    let dbRequest = indexedDB.open("CourtSystem", 1);
    dbRequest.onsuccess = function(e) {
        let db = e.target.result;
        // Request has been adden to object store
        let clerkStoreRequest = db.transaction("Clerks", 'readwrite').objectStore("Clerks")
        let getAllRequest = clerkStoreRequest.getAll();
        getAllRequest.onsuccess = function(e) {
            var clerkList = getAllRequest.result;
            var minClerk = clerkList[0];
            for(let i = 1; i < clerkList.length;i++) {
                if (minClerk.requests.length > clerkList[i].requests.length){
                    minClerk = clerkList[i];
                }    
            }
            minClerk.requests.push(caseRequest);
            clerkStoreRequest.put(minClerk);
            db.close();
            formContainer.style.display = "none";
            confirm.style.display = "block";
        }   
    }
}

function resetForm(){
    form.reset();
    formContainer.style.display = "block";
    confirm.style.display = "none";
}