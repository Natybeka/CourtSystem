//Objects and Database Design

/* This file should only be opened whenever there 
    is an operation required on the database
*/

// User Object has a name,access and password (Early design may be subject to change)
function User(userName, accessType, password){
    this.userName = userName;
    this.accessType = accessType;
    this.password = password; 
}

/*  
    Case Object design must have:
    1. ID or a case number,
    2. status, active or closed
    3. plaintiff,
    4. defendant
    5. courtLevel (level at which the case is currently being heard)
    6. judge
    7. caseOpened date at which case has been opened
    8. description for the case
    9. nextCourtDate
    
    and finally methods
    changing courtLevel and status
*/
function Case(caseID, status, plaintiff, defendant, courtLevel, judge, caseOpened, description, nextCourtDate) {
    this.caseID = caseID;
    this.status = status;
    this.plaintiff = plaintiff;
    this.defendant = defendant;
    this.courtLevel = courtLevel;
    this.caseOpened = caseOpened;
    this.description = description;
    this.judge = judge;
    this.nextCourtDate = nextCourtDate;
    
    this.changeStatus = function(newStatus) {
        if (newStatus != this.status) {
            this.status = newStatus;
        }    
    }
    
    this.changeCourtLevel = function(newCourtLevel) {
        if (this.courtLevel != newCourtLevel) {
            this.courtLevel = newCourtLevel;
        }
    }

    this.changeJudge = function(newJudge) {
        this.judge = newJudge;
    }
}

// Request Objects to store handle the request 
function Request(requestID, requestType, handled, userRequested) {
    this.requestID = requestID;
    this.requestType = requestType;
    this.requested = userRequested;
    this.handled = handled;
}

//Global Variable to hold the database
let Court;
//Opening database upon document loading
document.addEventListener('DOMContentLoaded', () => {
    let db = indexedDB.open("CourtSystem", 1);

    // Initialize the database
    db.onupgradeneeded = function(e){
        db = e.target.result;
        //Creating the Object store and the necessary indices for the db 
        let cases = db.createObjectStore("Cases", {keyPath : 'caseID'});
        cases.createIndex('by_caseno', 'caseID', {unique:true});
        cases.createIndex('by_judge', 'judge');
        cases.createIndex('by_status', 'status');
        cases.createIndex('by_nextDate', 'nextCourtDate');
        cases.createIndex('by_level', 'courtLevel');
        cases.createIndex('by_plaintiff', 'plaintiff');
        cases.createIndex('by_defendant', 'defendant');
        

        let users = db.createObjectStore('Users',{keyPath : 'userName'});
        users.createIndex('by_password', 'password');
        users.createIndex('by_access', 'accessType');

        let userRequests = db.createObjectStore('Request');
        userRequests.createIndex('by_requestID', 'requestID');
        userRequests.createIndex('by_status', 'handled');
        userRequests.createIndex('by_request_type', 'requestType'); 
    };

    //Assign to global variable if database already exists
    db.onsuccess = function() {
        Court = db.result; 
    };

    db.onerror = function() {
        // console.log("Error opening database");
    }

});