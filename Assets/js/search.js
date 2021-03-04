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
const searchIcon = document.querySelector('.search-icon');

searchIcon.addEventListener('click', search)

function search(){
    let searchInput = document.getElementById('searchInput').value;  
    let db = indexedDB.open("CourtSystem", 1);
    db.onsuccess = function(e) {
      let database = e.target.result;
      let caseStore = database.transaction("Cases").objectStore("Cases");
      let index = caseStore.index("by_caseno");
      let reqResults = index.get(searchInput);
      reqResults.onsuccess = function() {
        let result = reqResults.result;
        console.log(result);
        if (result == undefined) {
          // No data found with specified search parameter
          var container = document.getElementById('result-container');
          while(container.firstChild) {
            container.removeChild(container.firstChild);
          };
          container.innerHTML = returnShown();
          
        }
        else {
          console.log("Code Here")
          document.getElementById('empty-case').style.display = "none"
          let userView = ""
            userView += `
            <div class="row">
                        <div class="card col-sm-12">
                            <div class="card-body">
                                <h5 class="card-title"> Case Title: ${result.plaintiff + " Vs " + result.defendant}</h5>
                                <h6 class="card-subtitle mb-2">Case Number: ${result.caseID}</h6>
                                <p class="card-text lead">${result.description}</p>
                            </div>
                        </div>
            </div>                       
            `
          document.getElementById('result-container').innerHTML = userView;

        }
      }
    }
}


function returnShown() {
  return `<div class="card container">
    <div id='empty-case' class="container" style="color: white;border: 2px dashed rgb(155, 140, 140); border-radius: 10px;display: none;">
      <p class="text-center">
        You Have No Active Cases Right Now Please check again later.
      </p>
    </div>`;
}

function returnHidden() {
  return `<div class="card container">
  <div id='empty-case' class="container" style="color: white;border: 2px dashed rgb(155, 140, 140); border-radius: 10px;display: none;">
    <p class="text-center">
      You Have No Active Cases Right Now Please check again later.
    </p>
  </div>`;
}