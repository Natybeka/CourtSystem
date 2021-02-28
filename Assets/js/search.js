// const searchCaseBtn = document.querySelector(".searchCase-btn");
// const cancelBtn = document.querySelector(".cancel-btn");
// const searchCaseBox = document.querySelector(".searchCase-box");
// const searchCaseInput = document.querySelector("input");

// searchCaseBtn.onClick= () =>{
//     searchCaseBox.classList.add("active");
//     searchCaseInput.classList.add("active");
// }
const searchCaseBox = document.querySelector(".searchCase-box");
const searchCaseBtn = document.querySelector(".searchCase-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const searchCaseInput = document.querySelector("input");
const searchCaseData = document.querySelector(".searchCase-data");
searchCaseBtn.onclick =()=>{
  searchCaseBox.classList.add("active");
  searchCaseBtn.classList.add("active");
  searchCaseInput.classList.add("active");
  cancelBtn.classList.add("active");
  searchCaseInput.focus();
  if(searchCaseInput.value != ""){
    var values = searchCaseInput.value;
    searchCaseData.classList.remove("active");
    searchCaseData.innerHTML = "You just typed " + "<span style='font-weight: 500;'>" + values + "</span>";
  }else{
    searchCaseData.textContent = "";
  }
}
cancelBtn.onclick =()=>{
  searchCaseBox.classList.remove("active");
  searchCaseBtn.classList.remove("active");
  searchCaseInput.classList.remove("active");
  cancelBtn.classList.remove("active");
  searchCaseData.classList.toggle("active");
  searchCaseInput.value = "";
}
// const searchCase = window.indexedDB.open('database', 1);
// searchCase.onsuccess = () => {
//     const db = searchCase.result;
//     const transaction = db.transaction(['invoices'], 'readonly');
//     const invoiceStore = transaction.objectStore('invoices');
//     const getCursorsearchCase = invoiceStore.openCursor();
//     getCursorsearchCase.onsuccess = e => {
//          const cursor = e.target.result;
//         if (cursor) {
//             console.log(cursor.value);
//             cursor.continue();
//         } else {
//             console.log('Exhausted all documents');
//         }
//     }
//     }
function getByCase(e) {
	e.preventDefault();
	var by_caseno = $("#by_caseno").val();

	var transaction = db.transaction(["Cases"], "readonly");
	var objectStore = transaction.objectStore("Cases");
	var index = objectStore.index("by_casenos");
		
	var s = "";

	var rangeTest = IDBKeyRange.only(by_caseno);
	index.openCursor(rangeTest).onsuccess = function(e) {
		var cursor = e.target.result;
		if (cursor) {
			s += "<h2>Key "+cursor.key+"</h2><p>";
			for(var field in cursor.value) {
				s+= field+"="+cursor.value[field]+"<br/>";
			}
			s+="</p>";
			cursor.continue();
		}
		$("#searchresults").html(s);
	}

}

