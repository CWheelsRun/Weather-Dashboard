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

// save previously searched cities to local storage
function saveCities() {
    localStorage.setItem("recent", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
}

// retrieve city based on user input
function getCity() {
    city = $("#city-input").val();
    if (city && cities.includes(city) === false) {
      saveCities();
      return city;
    }
}

function search() {
    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430";
    let coords = [];

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
    coords.push(response.coord.lat);
    coords.push(response.coord.lon);
    let cityName = response.name;
    let cityCond = response.weather[0].description.toUpperCase();
    let cityTemp = response.main.temp;
    let cityHum = response.main.humidity;
    let cityWind = response.wind.speed;
    let icon = response.weather[0].icon;
    $("#icon").html(
        `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
    );
    $("#city-name").html(cityName + " " + "(" + currentDate + ")");
    $("#city-cond").text("Current Conditions: " + cityCond);
    $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
    $("#humidity").text("Humidity: " + cityHum + "%");
    $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
    $("#date1").text(day1);
    $("#date2").text(day2);
    $("#date3").text(day3);
    $("#date4").text(day4);
    $("#date5").text(day5);

    getUV(response.coord.lat, response.coord.lon);
    }).fail(function (){
    alert("Could not retrieve data")
    });

    // retrieve 5-day forecast and display elements
    function getUV(lat, lon) {
     
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430",
            method: "GET",
        }).then(function (response) {

        // displays UV Index and determines severity
        let uvIndex = response.current.uvi;
        $("#uv-index").text(uvIndex);
        if (uvIndex >= 8) {
          $("#uv-index").css("background-color", "red");
        } else if (uvIndex > 4 && uvIndex < 8) {
          $("#uv-index").css("background-color", "yellow");
        } else {
          $("#uv-index").css("background-color", "green");
        }

        // FORECAST VARIABLES
        // temperature
        let temp1 = response.daily[1].temp.day;
        let temp2 = response.daily[2].temp.day;
        let temp3 = response.daily[3].temp.day;
        let temp4 = response.daily[4].temp.day;
        let temp5 = response.daily[5].temp.day;
        // humidity
        let hum1 = response.daily[1].humidity;
        let hum2 = response.daily[2].humidity;
        let hum3 = response.daily[3].humidity;
        let hum4 = response.daily[4].humidity;
        let hum5 = response.daily[5].humidity;
        // wind speed
        let wind1 = response.daily[1].wind_speed;
        let wind2 = response.daily[2].wind_speed;
        let wind3 = response.daily[3].wind_speed;
        let wind4 = response.daily[4].wind_speed;
        let wind5 = response.daily[5].wind_speed;
        // weather icon
        let icon1 = response.daily[1].weather[0].icon;
        let icon2 = response.daily[2].weather[0].icon;
        let icon3 = response.daily[3].weather[0].icon;
        let icon4 = response.daily[4].weather[0].icon;
        let icon5 = response.daily[5].weather[0].icon;

        $("#temp1").text("Temp(F):" + " " + temp1.toFixed(1));
        $("#temp2").text("Temp(F):" + " " + temp2.toFixed(1));
        $("#temp3").text("Temp(F):" + " " + temp3.toFixed(1));
        $("#temp4").text("Temp(F):" + " " + temp4.toFixed(1));
        $("#temp5").text("Temp(F):" + " " + temp5.toFixed(1));

        $("#hum1").text("Humidity:" + " " + hum1 + "%");
        $("#hum2").text("Humidity:" + " " + hum2 + "%");
        $("#hum3").text("Humidity:" + " " + hum3 + "%");
        $("#hum4").text("Humidity:" + " " + hum4 + "%");
        $("#hum5").text("Humidity:" + " " + hum5 + "%");

        $("#wind1").text("Wind:" + " " + wind1 + "mph");
        $("#wind2").text("Wind:" + " " + wind2 + "mph");
        $("#wind3").text("Wind:" + " " + wind3 + "mph");
        $("#wind4").text("Wind:" + " " + wind4 + "mph");
        $("#wind5").text("Wind:" + " " + wind5 + "mph");

        $("#icon1").html(
          `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
        );
        $("#icon2").html(
          `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
        );
        $("#icon3").html(
          `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
        );
        $("#icon4").html(
          `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
        );
        $("#icon5").html(
          `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
        );
      });
    }
  }

// forms list of previously searched cities on page
function listCities() {
    $("#cityList").text("");
    cities.forEach((city) => {
      $("#cityList").prepend("<tr><td>" + city + "</td></tr>");
    });
}

listCities();

// previously searced city's data is loaded on click
$(document).on("click", "td", (e) => {
    e.preventDefault();
    let listedCity = $(e.target).text();
    city = listedCity;
    search();
});

// clear button clears previously searced cities
$("#clear").click(() => {
    localStorage.removeItem("cities");
    loadRecentCities();
    listCities();
});

});