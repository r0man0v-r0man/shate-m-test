"use strict";
var ShateMTestConnection = new signalR.HubConnectionBuilder().withUrl("/ShateMHub").build();

var submitAddBrand = document.getElementById("add-brand-submit");
var carList = document.getElementById("car-brand-list");

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
    document.getElementById("brand").value = "";
    document.getElementById("brand").focus();
};
ShateMTestConnection.on("AddBrand", function (brandName, brandId) {
    var li = document.createElement("li");
    var liBrandId = document.createElement("li");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("value", brandId);
    li.classList.add("list-group-item", "list-group-item-primary");
    li.innerText = brandName;
    liBrandId.className = "d-none";
    liBrandId.appendChild(input);
    carList.appendChild(li);
    carList.appendChild(liBrandId);
});