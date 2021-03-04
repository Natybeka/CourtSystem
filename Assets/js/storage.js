//Objects and Database Design

/* This file should only be opened whenever there 
    is an operation required on the database
*/

// User Object has a name,access and password (Early design may be subject to change)
function User(userName, fullName, accessType, password){
    this.userName = userName;
    this.accessType = accessType;
    this.password = password;
    this.fullName = fullName; 
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
function Case(caseID, status, plaintiff, defendant, judge, caseOpened, description) {
    this.caseID = caseID;
    this.status = status;
    this.plaintiff = plaintiff;
    this.defendant = defendant;
    this.caseOpened = caseOpened;
    this.description = description;
    this.judge = judge;
    // Will be implemented later
    // this.nextCourtDate = nextCourtDate;
    
    // this.changeStatus = function(newStatus) {
    //     if (newStatus != this.status) {
    //         this.status = newStatus;
    //     }    
    // }
    
    // this.changeCourtLevel = function(newCourtLevel) {
    //     if (this.courtLevel != newCourtLevel) {
    //         this.courtLevel = newCourtLevel;
    //     }
    // }

    // this.changeJudge = function(newJudge) {
    //     this.judge = newJudge;
    // }
}

// Request Objects to store handle the request 
function Request(requestType, userRequested, caseInfo) {
    this.requestType = requestType;
    this.requested = userRequested;
    this.caseInfo = caseInfo;
}

// Jusdge Objects
function Judge(cases, userName, fullName, accessType, password) {

    User.call(this, userName, fullName, accessType, password);
    // Judge hanldes the cases
    this.cases = cases;
}
//Judge is a user prototype
Judge.prototype = Object.create(User.prototype);
Judge.prototype.constructor = Judge;

function Clerk(requests, userName, fullName, accessType, password) {
    User.call(this, userName, fullName, accessType, password);

    this.requests = requests;
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
        let cases = db.createObjectStore("Cases", {keyPath : 'caseID', autoIncrement : true});
        cases.createIndex('by_caseno', 'caseID', {unique:true});
        cases.createIndex('by_judge', 'judge');
        cases.createIndex('by_status', 'status');
        cases.createIndex('by_nextDate', 'nextCourtDate');
        cases.createIndex('by_fullname', 'fullName')
        cases.createIndex('by_plaintiff', 'plaintiff');
        cases.createIndex('by_defendant', 'defendant');
        

        let users = db.createObjectStore('Users',{keyPath : 'userName', unique:true});
        users.createIndex('by_access', 'accessType');
      
        let judges = db.createObjectStore('Judges',{keyPath : 'userName', unique:true});

        let clerk = db.createObjectStore('Clerks', {keyPath : 'userName', unique:true});

    };

    //Assign to global variable if database already exists
    db.onsuccess = function(e) {
        Court = e.target.result;
        // console.log("Database is ready"); 
        let userObject = Court.transaction("Users", "readwrite").objectStore("Users");
        userObject.add(new User("uniqueUser", "Natnael Bekabtu", "User", encrypt("password")));
        // console.log("Added first User");
        

        let Clerk1 = Court.transaction("Clerks", "readwrite").objectStore("Clerks");
        Clerk1.add(new Clerk([], "Clerk1", "First Clerk", "Clerk", encrypt("password")));
        // console.log("Added seconde User");

        let Judge1 = Court.transaction("Judges", "readwrite").objectStore("Judges");
        Judge1.add(new Judge([], "Yemame234", "First Judge", "Judge", encrypt("password")));
        // console.log("Added seconde User");

        // let userObject4 = Court.transaction("Judges", "readwrite").objectStore("Judges");
        // userObject4.add(new User("Judge1", "Natnael Bekabtu", "Judge", "zembel27"));
        // console.log("Added seconde User");

        
        

        let caseObject = Court.transaction("Cases","readwrite").objectStore("Cases");
        caseObject.add(new Case("aw1","active","uniqueUser","uniqueUser2","Yemame234",new Date(),"Mr M was viciously attacked by unknown assailants following a night out with friends. He suffered a fracture of the orbital bone cavity of his right eye requiring two operations and leaving him with permanent scarring. Having been refused Criminal Injuries Compensation by the CICA the Student Law Office successfully helped Mr M appeal this decision. We represented Mr M at his hearing he was awarded £2,200 in compensation as a result."));

        let caseObject2 = Court.transaction("Cases","readwrite").objectStore("Cases");
        caseObject2.add(new Case("aw2","active","uniqueUser","uniqueUser2","Yemame234",new Date(),"Mr M was viciously attacked by unknown assailants following a night out with friends. He suffered a fracture of the orbital bone cavity of his right eye requiring two operations and leaving him with permanent scarring. Having been refused Criminal Injuries Compensation by the CICA the Student Law Office successfully helped Mr M appeal this decision. We represented Mr M at his hearing he was awarded £2,200 in compensation as a result."));

        let caseObject3 = Court.transaction("Cases","readwrite").objectStore("Cases");
        caseObject3.add(new Case("aw3","active","uniqueUser2","uniqueUser1","erwqwe34",new Date(),"Mr M was viciously attacked by unknown assailants following a night out with friends. He suffered a fracture of the orbital bone cavity of his right eye requiring two operations and leaving him with permanent scarring. Having been refused Criminal Injuries Compensation by the CICA the Student Law Office successfully helped Mr M appeal this decision. We represented Mr M at his hearing he was awarded £2,200 in compensation as a result."));

        let caseObject4 = Court.transaction("Cases","readwrite").objectStore("Cases");
        caseObject4.add(new Case("aw4","active","uniqueUser","uniqueUser2","Yemame234",new Date(),"Mr M was viciously attacked by unknown assailants following a night out with friends. He suffered a fracture of the orbital bone cavity of his right eye requiring two operations and leaving him with permanent scarring. Having been refused Criminal Injuries Compensation by the CICA the Student Law Office successfully helped Mr M appeal this decision. We represented Mr M at his hearing he was awarded £2,200 in compensation as a result."));

        let caseObject5 = Court.transaction("Cases","readwrite").objectStore("Cases");
        caseObject5.add(new Case("aw5","closed","uniqueUser2","uniqueUser","Yemame234",new Date(),"Mr M was viciously attacked by unknown assailants following a night out with friends. He suffered a fracture of the orbital bone cavity of his right eye requiring two operations and leaving him with permanent scarring. Having been refused Criminal Injuries Compensation by the CICA the Student Law Office successfully helped Mr M appeal this decision. We represented Mr M at his hearing he was awarded £2,200 in compensation as a result."));

        // Close this instance after data population
        console.log("Database populated and closed")
        Court.close();
    };

    db.onerror = function() {
        console.log("Error opening database");
    }
    
});

function encrypt(str) {
    let output = '';
    const key = 5; // Cipher key
    for (let i = 0; i < str.length; i++) {
        // check whether the charactre is a number
        if (isNaN(str.charAt(i))) {
            
            if (isUpperCase(str.charAt(i))) {
                output += String.fromCharCode((str.charCodeAt(i) + 5 - 65) % 26 + 65);
            }

            else {
                output += String.fromCharCode((str.charCodeAt(i) + 5 - 97) % 26 + 97);
            }
        }
        else{
            output += str.charAt(i);
        }
         
    }
    return output;
}

function isUpperCase(char){return char === char.toUpperCase();}


export {User, Case, Request, Judge, Clerk, encrypt, isUpperCase}
