// const searchCaseBtn = document.querySelector(".searchCase-btn");
// const cancelBtn = document.querySelector(".cancel-btn");
// const searchCaseBox = document.querySelector(".searchCase-box");
// const searchCaseInput = document.querySelector("input");

// searchCaseBtn.onClick= () =>{
//     searchCaseBox.classList.add("active");
//     searchCaseInput.classList.add("active");
// }
// const searchCaseBox = document.querySelector(".searchCase-box");
// const searchCaseBtn = document.querySelector(".searchCase-icon");
// const cancelBtn = document.querySelector(".cancel-icon");
// const searchCaseInput = document.querySelector("input");
// const searchCaseData = document.querySelector(".searchCase-data");
// searchCaseBtn.onclick =()=>{
//   searchCaseBox.classList.add("active");
//   searchCaseBtn.classList.add("active");
//   searchCaseInput.classList.add("active");
//   cancelBtn.classList.add("active");
//   searchCaseInput.focus();
//   if(searchCaseInput.value != ""){
//     var values = searchCaseInput.value;
//     searchCaseData.classList.remove("active");
//     searchCaseData.innerHTML = "You just typed " + "<span style='font-weight: 500;'>" + values + "</span>";
//   }else{
//     searchCaseData.textContent = "";
//   }
// }
// cancelBtn.onclick =()=>{
//   searchCaseBox.classList.remove("active");
//   searchCaseBtn.classList.remove("active");
//   searchCaseInput.classList.remove("active");
//   cancelBtn.classList.remove("active");
//   searchCaseData.classList.toggle("active");
//   searchCaseInput.value = "";
// }
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', search)

function search(){
    let searchInput = document.getElementById('searchInput').value;  
    let casesByNumber = document.querySelectorAll('.caseNumber');
    
    casesByNumber.forEach( function(cas) {
        if (cas.textContent.indexOf(searchInput) == -1) {
            cas.parentElement.parentElement.style.display = "none";
        } else {
            cas.parentElement.parentElement.style.display = "block";
        }
    })
}