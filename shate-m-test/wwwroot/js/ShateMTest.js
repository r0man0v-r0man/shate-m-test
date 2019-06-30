"use strict";
var ShateMTestConnection = new signalR.HubConnectionBuilder().withUrl("/ShateMHub").build();

var submitAddBrand = document.getElementById("add-brand-submit");
var carList = document.getElementById("car-brand-list");
var submitAddCarModel = document.getElementById("add-car-model-submit");
var modelList = document.getElementById("model-list");
var showLinks = document.getElementsByClassName("show-link");
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
    var input = document.createElement("input");
    var a = document.createElement("a");
    input.setAttribute("type", "hidden");
    input.setAttribute("value", brandId);
    input.setAttribute("name", "brandId");
    a.className = "link show-link";
    a.setAttribute("href", "#");
    a.setAttribute("name", brandId);
    a.innerText = brandName;
    li.id = "b-" + brandId;
    li.classList.add("list-group-item", "list-group-item-primary");
    li.append(a);
    li.append(input);
    carList.appendChild(li);
    var selectBrands = document.getElementById("brand-id");
    var option = document.createElement("option");
    option.text = brandName;
    option.value = brandId;
    selectBrands.add(option);
    $(".selectpicker").selectpicker("refresh");
});

submitAddCarModel.onclick = function () {
    ShateMTestConnection.invoke("AddCarModel", document.getElementById("brand-id").value, document.getElementById("car-model").value )
        .catch(function (err) {
            return console.error(err.toString());
        });
    document.getElementById("car-model").value = "";
    document.getElementById("car-model").focus();
};
ShateMTestConnection.on("GetModels", function (data, id) {
    var result = JSON.parse(data);
    if (!modelList.childElementCount) {
        for (var i = 0; i < result.length; i++) {
            var li = document.createElement("li");
            var liInput = document.createElement("li");
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("value", result[i].BrandId);
            liInput.className = "d-none";
            liInput.appendChild(input);
            li.className = "list-group-item list-group-item-action";
            li.innerText = result[i].Name;
            modelList.appendChild(li);
            modelList.appendChild(liInput);
        };
    };
});
document.addEventListener("click", function (e) {
    if (e.target && e.target.className == "link show-link") {
        while (modelList.firstChild) {
            modelList.removeChild(modelList.firstChild);
        };
        ShateMTestConnection.invoke("GetModels", e.target.getAttribute("name"))
            .catch(function (err) {
                return console.error(err.toString());
            });
    }
});