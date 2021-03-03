const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const searchInput = document.querySelector("input");
const searchData = document.querySelector(".search-data");
searchBtn.onclick =()=>{
  searchBox.classList.add("active");
  searchBtn.classList.add("active");
  searchInput.classList.add("active");
  cancelBtn.classList.add("active");
  searchInput.focus();
  if(searchInput.value != ""){
    var values = searchInput.value;
    searchData.classList.remove("active");
    
  }else{
    searchData.textContent = "";
  }
}
cancelBtn.onclick =()=>{
  searchBox.classList.remove("active");
  searchBtn.classList.remove("active");
  searchInput.classList.remove("active");
  cancelBtn.classList.remove("active");
  searchData.classList.toggle("active");
  searchInput.value = "";
}
const searchIcon = document.getElementById('.search-icon');

searchIcon.addEventListener('click', search)

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