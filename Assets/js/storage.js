//Objects Design

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