﻿"use strict";
var ShateMTestConnection = new signalR.HubConnectionBuilder().withUrl("/ShateMHub").build();

var submitAddBrand = document.getElementById("add-brand-submit");
var carList = document.getElementById("car-brand-list");
var submitAddCarModel = document.getElementById("add-car-model-submit");
var modelList = document.getElementById("model-list");
var showLinks = document.querySelectorAll("#show-link");
ShateMTestConnection.start()
    .then(function () {
        console.log("connection shate m started");
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

submitAddCarModel.onclick = function () {
    ShateMTestConnection.invoke("AddCarModel", document.getElementById("brand-id").value, document.getElementById("car-model").value )
        .catch(function (err) {
            return console.error(err.toString());
        });
};
[].forEach.call(showLinks, function (item) {
    item.addEventListener("click", function (event) {
        while (modelList.firstChild) {
            modelList.removeChild(modelList.firstChild);
        };
        ShateMTestConnection.invoke("GetModels", item.closest("li").getElementsByTagName("input")[0].value)
            .catch(function (err) {
                return console.error(err.toString());
            });
        event.preventDefault();
    });
});
ShateMTestConnection.on("GetModels", function (data) {
    var result = JSON.parse(data);
    if (!modelList.childElementCount) {
        for (var i = 0; i < result.length; i++) {
            var li = document.createElement("li");
            li.className = "list-group-item";
            li.innerText = result[i].Name;
            modelList.appendChild(li);
        };
    };
    
});