let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let time = document.querySelector(".time");
let temperatureDesc = document.querySelector(".temperature-description");
let weatherIcon = document.querySelector(".weather-icon");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  searchWeather();
}

const renderGeoWeather = function (data, timeData) {
  // let temp = "";
  // let description = "";
  // let icon = "";
  // let city = "";
  // let country = "";

  // if ((type = "geo")) {

  //   type = "";
  // } else {
  //   temp = data.main.temp;
  //   description = data.weather[0].description;
  //   icon = data.weather[0].icon;
  //   city = data.name;
  //   country = data.sys.country;
  //   type = "";
  // }

  const { temp } = data.list[0].main;
  const { description, icon } = data.list[0].weather[0];
  const { name } = data.list[0];
  const { country } = data.list[0].sys;

  const descCapital =
    description.charAt(0).toUpperCase() + description.slice(1);

  temperatureDegree.textContent = Math.round(temp);
  locationTimezone.textContent = `${name}, ${country}`;
  temperatureDesc.textContent = descCapital;
  weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // const html = `
  //   <div class="location">
  //     <h1 class="location-timezone">${name}, ${country}</h1>
  //     <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>
  //   </div>
  //   <div class="temperature">
  //     <div class="degree-section">
  //       <h2 class="temperature-degree">${Math.round(temp)}</h2>
  //       <span>C</span>
  //     </div>
  //     <div class="temperature-description">${descCapital}</div>
  //   </div>
  //   `;

  //document.body.innerHTML = html;
  // const bodyContainer = document.getElementsById("body");
  // bodyContainer.innerHTML = html;
  // document.body.createElement(html);
};

const renderSearchWeather = function (data, timeData) {
  const { temp } = data.main;
  const { description, icon } = data.weather[0];
  const { name } = data;
  const { country } = data.sys;

  const descCapital =
    description.charAt(0).toUpperCase() + description.slice(1);

  temperatureDegree.textContent = Math.round(temp);
  locationTimezone.textContent = `${name}, ${country}`;
  temperatureDesc.textContent = descCapital;
  weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

const getPosition = () =>
  new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const getWeather = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    const weatherData = await fetch(
      `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=1&units=metric&appid=9b084a8b56d739bf7b9886f131a85ba3`
    );

    const data = await weatherData.json();

    renderGeoWeather(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const searchWeather = async function () {
  try {
    const input = document.querySelector('input[type="text"]');
    const location = input.value;

    // const timeData = await fetch(``);

    const weatherData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9b084a8b56d739bf7b9886f131a85ba3`
    );

    const data = await weatherData.json();

    renderSearchWeather(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", getWeather());
