class WeatherApp {
  constructor(key) {
    this.key = key;
  }

  getData = async function (city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&units=metric`
    );

    // Handeling responses
    let message;
    switch (response.status) {
      case 200:
        message = `Successfull request`;
        console.log(message);
        break;
      case 404:
        message = `City not found...`;
        alert(message);
        break;
      // TODO: add more possible responses
    }

    const output = await response.json();
    this.createCard(output);
  };

  createCard(data) {

    const temp = $("#temp");
    temp.text(data.main.temp.toFixed(1) + "°C");

    const weatherIcon = $("#weather-icon");

    // switch between all the weather icons
    const currentWeather = data.weather[0].main;
    switch (currentWeather) {
      case "Clear":
        weatherIcon.attr("src", "img/clear.png");
        break;
      case "Mist":
        weatherIcon.attr("src", "img/mist.png");
        break;
      case "Clouds":
        weatherIcon.attr("src", "img/clouds.png");
        break;
      case "Drizzle":
        weatherIcon.attr("src", "img/drizzle.png");
        break;
      case "rain":
        weatherIcon.attr("src", "img/rain.png");
        break;
      case "Snow":
        weatherIcon.attr("src", "img/snow.png");
        break;
      default:
        weatherIcon.attr("src", "img/clear.png");
    }

    const cityName = $("#city-name");
    cityName.text(data.name);

    const humidity = $(".humidity-text");
    humidity.text(data.main.humidity + "%");

    const wind = $(".wind-text");
    wind.text(data.wind.speed + " km/h");
  }
}

function bindSearchButton(weatherAppObj) {
  $(".fa-solid").click(function () {
    const inputCity = $("#input").val();
    weatherAppObj.getData(inputCity);
  });
  $("#input").keyup(function (event) {
    // keyCode 13 = ENTER
    if (event.keyCode === 13) {
      $(".fa-solid").click();
    }
  });
}

// YOUR KEY GOES HERE !!
const weatherAppObj = new WeatherApp(config.SECRET_KEY);

$(window).bind("load", function () {
  bindSearchButton(weatherAppObj);
});
