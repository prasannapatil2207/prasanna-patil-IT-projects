window.onload = function () {
    showContacts();
};

document.getElementById("contactForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("Address").value;

    if (name == "" || phone == "") {
        alert("Enter Name and Phone");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({
        name: name,
        phone: phone,
        address: address
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    document.getElementById("contactForm").reset();

    showContacts();
});

function showContacts() {

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let table = document.getElementById("dataTable");

    table.innerHTML =
        "<tr><th>Name</th><th>Phone</th><th>Address</th><th>Action</th></tr>";

    for (let i = 0; i < contacts.length; i++) {

        let row = table.insertRow();

        row.insertCell(0).innerHTML = contacts[i].name;
        row.insertCell(1).innerHTML = contacts[i].phone;
        row.insertCell(2).innerHTML = contacts[i].address;
        row.insertCell(3).innerHTML =
            '<button onclick="deleteRow(' + i + ')">Delete</button>';
    }
}

function searchContact() {

    let input = document.getElementById("search").value.toLowerCase();

    let table = document.getElementById("dataTable");

    let rows = table.rows;

    for (let i = 1; i < rows.length; i++) {

        let name = rows[i].cells[0].innerHTML.toLowerCase();
        let phone = rows[i].cells[1].innerHTML.toLowerCase();
        let address = rows[i].cells[2].innerHTML.toLowerCase();

        if (name.includes(input) || phone.includes(input) || address.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function deleteRow(index) {

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    showContacts();
}