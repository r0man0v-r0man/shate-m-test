"use strict";
var ShateMTestConnection = new signalR.HubConnectionBuilder().withUrl("/ShateMHub").build();

var submitAddBrand = document.getElementById("add-brand-submit");


ShateMTestConnection.start()
    .then(function () {
        console.log("connection addbrand started");
    })
    .catch(error => {
        console.error(error.message);
    });
submitAddBrand.onclick = function (event) {
    var newBrand = document.getElementById("brand").value;
    ShateMTestConnection.invoke("AddBrand", newBrand)
        .catch(function (err) {
            return console.error(err.toString());
        });
    event.preventDefault();
};
ShateMTestConnection.on("AddBrand", function (brandName) {
    var li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-primary");
    li.innerText = brandName;
    document.getElementById("car-brand-list").appendChild(li);
});