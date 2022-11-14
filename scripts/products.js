//Nav Bar
function menuBarChange(x) {
    x.classList.toggle("change");
}

const navURLs = [
    { name: "Home", url: "index.html" },
    { name: "About Us", url: "#" },
];

const navIcons = [
    { classList: "fab fa-opencart px-3", url: "#" },
    { classList: "far fa-user", url: "#" },
    { classList: "subtitle px-3", url: "#" }
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

function createNavIcon(icon) {
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

//   MAIN CODE

const mode = document.getElementById("mode");
const results = document.getElementById("results");
let select = undefined; //global scope

function productLink(p) {
    const d = document.createElement("div");
    d.classList.add("card");
    d.innerHTML = `<a href="details.html?id=${p.productId}"> ${p.productName}</a>`;
    return d
}

function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}

function showAll() {
    results.innerHTML = "";
    fetch("http://localhost:8081/api/products")
        .then(response => response.json())
        .then(data => {

            data.sort(sortByProperty("productName"));
            data.forEach(p => {
                results.appendChild((productLink(p)));
            })
        })
}

function createTd(product, property) {
    let td = document.createElement("td");
    td.innerHTML = product[property];
    return td;
}

function createRow(product, table) {
    let row = document.createElement("tr");
    //table.classList.add("")
    row.appendChild(createTd(product, "productName"));
    row.appendChild(createTd(product, "unitPrice"));
    row.appendChild(createTd(product, "unitsInStock"));
    row.appendChild(createTd(product, "supplier"));
    table.appendChild(row);
}

function showResults() {
    results.innerHTML = "";
    const id = select.selectedOptions[0].value;
    fetch("http://localhost:8081/api/categories/" + id)
        .then(response => response.json())
        .then(data => {

            const table = document.createElement("table");
            data.sort(sortByProperty("productName"));
            //table.border = 1;
            data.forEach(p => {
                createRow(p, table);
            })
            results.appendChild(table);
        })
}

function createSelect() {
    select = document.createElement("select");
    fetch("http://localhost:8081/api/categories")
        .then(response => response.json())
        .then(data => {
            data.forEach(c => {
                const opt = document.createElement("option");
                opt.value = c.categoryId;
                opt.innerHTML = c.name;
                select.appendChild(opt);
            });
            select.addEventListener("change", e => showResults());
            mode.after(select); //insert new select after the mode select.
            //document.body.appendChild(select);
        })
}

//=======================================================
mode.addEventListener("change", e => {
    const value = mode.selectedOptions[0].value;
    if ("category" == value) {
        results.innerHTML = "";
        //Create select
        createSelect();
    } else {
        showAll();
        //destroy select
        if (undefined != select) {
            select.remove();
        }
    }
});