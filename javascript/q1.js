$(function () {

    showContacts();

    $("#saveBtn").click(function () {
        let name = $("#name").val();
        let phone = $("#phone").val();

        if (name == "" || phone == "") {
            alert("Enter Name and Phone");
            return;
        }

        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        contacts.push({ name, phone });

        localStorage.setItem("contacts", JSON.stringify(contacts));

        $("#contactForm")[0].reset();

        showContacts();
    });

    $("#search").keyup(function () {
        showContacts($(this).val());
    });

    function showContacts(search = "") {

        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        $("#dataTable tbody").html("");

        contacts.forEach(function (c, i) {
            if (c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)) {
                $("#dataTable tbody").append(`
                    <tr>
                        <td>${c.name}</td>
                        <td>${c.phone}</td>
                        <td><button class="deleteBtn btn btn-danger btn-sm" data-id="${i}">Delete</button></td>
                    </tr>
                `);
            }
        });
    }

    $(document).on("click", ".deleteBtn", function () {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        contacts.splice($(this).data("id"), 1);

        localStorage.setItem("contacts", JSON.stringify(contacts));

        showContacts($("#search").val());
    });

});