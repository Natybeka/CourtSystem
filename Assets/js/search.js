const searchBtn = document.querySelector(".search-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const searchBox = document.querySelector(".search-box");
searchBtn.onClick= () =>{
    searchBox.classList.add("active");
}