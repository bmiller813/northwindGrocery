//Nav Bar
function menuBarChange(x) {
    x.classList.toggle("change");
}

const navURLs = [
    { name: "About Us", url: "#" },
    { name: "Products", url: "products.html" },
];

const navIcons = [
    {classList: "fab fa-opencart px-3", url: "#"},
    {classList: "far fa-user", url: "#"},
    {classList: "subtitle px-3", url: "#"}
]

function navLink(item) {
    const div = document.createElement("div");
    div.classList.add("nav-block");
    const a = document.createElement("a");
    a.href = item.url;
    div.innerHTML = item.name;
    a.appendChild(div);
    return a;
}

function createNavIcon(icon){
    const span = document.createElement("span");
    const a = document.createElement("a");
    const i = document.createElement("i");
    a.href = icon.url;
    span.setAttribute("class", icon.classList);
    span.appendChild(i);
    a.appendChild(span);
    
    return a;
}

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");
    navURLs.forEach(item => nav.appendChild(navLink(item)));

    const form = document.createElement("form");
    navIcons.forEach(icon => form.appendChild(createNavIcon(icon)));
    nav.appendChild(form);
});