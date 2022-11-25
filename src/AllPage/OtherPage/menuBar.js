let nav = document.querySelector("#navArea");
let btn = document.querySelector(".toggleBtn");
let mask = document.querySelector("#mask");

btn.onclick = () => {
    nav.classList.toggle("open");
};

mask.onclick = () => {
    nav.classList.toggle("open")
};