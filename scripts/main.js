//Nav Bar
function menuBarChange(x) {
    x.classList.toggle("change");
}

const navURLs = [
    { name: "About Us", url: "#" },
    { name: "Products", url: "products.html" },
];

function navLink(item) {
    const div = document.createElement("div");
    div.classList.add("nav-block");
    const a = document.createElement("a");
    a.href = item.url;
    div.innerHTML = item.name;
    a.appendChild(div);
    return a;
}

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");
    navURLs.forEach(item => nav.appendChild(navLink(item)));
});