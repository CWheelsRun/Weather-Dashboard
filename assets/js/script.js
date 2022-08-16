$(document).ready(function () {

// shows the current date
let currentDate= moment().format("l");
  
// adds days for forecast entries
let day1 = moment().add(1, "days").format("l");
let day2 = moment().add(2, "days").format("l");
let day3 = moment().add(3, "days").format("l");
let day4 = moment().add(4, "days").format("l");
let day5 = moment().add(5, "days").format("l");

let city;
let cities;

// page loads the most recently searched city
function loadRecent() {
    let lastCity = localStorage.getItem("recent");
    if (lastCity) {
      city = lastCity;
      search();
    } else {
      city = "Atlanta";
      search();
    }
}

loadRecent()

// page loads list of recently searched cities
function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));
    if (recentCities) {
      cities = recentCities;
    } else {
      cities = [];
    }
}

loadRecentCities()

// search city on click
$("#submit").on("click", (e) => {
    e.preventDefault();
    getCity();
    search();
    $("#city-input").val("");
    listCities();
});

});