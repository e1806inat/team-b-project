const list = document.querySelectorAll(".list");
console.log(list);
function activeLink() {

    var page = document.getElementById("")
    list.forEach((item) => 
        item.classList.remove("active")
    );

    
    this.classList.add("active");
}

function page(clicked_id){
    if(clicked_id === "home"){
        document.getElementById("selectedPage").src = "./design/home.html";
        console.log(clicked_id);
    }
    else if(clicked_id === "prefill"){
        document.getElementById("selectedPage").src = "./prefill.html";
        console.log(clicked_id);
    }
    else if(clicked_id === "promptReport"){
        document.getElementById("selectedPage").src = "./promptReport.html";
        console.log(clicked_id);
    }
    else{
        document.getElementById("selectedPage").src = "./database.html";
        console.log(clicked_id);
    }

}



list.forEach((item) => {
    item.addEventListener("click", activeLink);
});
