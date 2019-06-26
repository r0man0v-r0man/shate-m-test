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
submitAddBrand.onclick = function () {
    var newBrand = document.getElementById("brand").value;
    ShateMTestConnection.invoke("AddBrand", newBrand)
        .catch(function (err) {
            return console.error(err.toString());
        });
};
ShateMTestConnection.on("AddBrand", function (brandName) {
    alert(brandName);
});