const fileButton = document.querySelector("#file");
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
    console.log(caseRequest)
}