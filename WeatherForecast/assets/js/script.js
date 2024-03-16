// define variables 
var buttonEl = document.querySelector('button');
var currentEl = document.querySelector('.current');
var fiveDayEl = document.querySelector('.five-day');
var cityInput = document.querySelector('input');
var cityArray = [];
var searchedCities = document.querySelector('aside ul');


// event listener for searching a city using the search button
buttonEl.addEventListener('click', function (event) {
    event.preventDefault();
    if (cityInput.value === '') {
        alert('Please enter a valid city!');
        return;
    }
    currentEl.setAttribute('style', 'visibility: visible');
    fiveDayEl.setAttribute('style', 'visibility: visible');
    var cities = {
        name: cityInput.value
    };
    cityArray.push(cities);
    localStorage.setItem('local-cityArray', JSON.stringify(cityArray));
    renderCities();
    weatherFetch(cityInput.value);
});

// get cities out of localstorage 
function getCities() {
    var storedCities = JSON.parse(localStorage.getItem('local-cityArray'));
    if (storedCities !== null) {
        cityArray = storedCities;
    } else {
        return;
    }
    renderCities();
}
getCities();

//display cities on webpage and add click event to show weather forecast
function renderCities() {
    searchedCities.innerHTML = '';
    for (var i = 0; i < cityArray.length; i++) {
        var city = cityArray[i];
        var liEl = document.createElement('li');
        var aEl = document.createElement('a');
        aEl.textContent = city.name;
        searchedCities.appendChild(liEl);
        liEl.appendChild(aEl);
        aEl.addEventListener('click', function (event) {
            currentEl.setAttribute('style', 'visibility: visible');
            fiveDayEl.setAttribute('style', 'visibility: visible');
            weatherFetch(this.innerHTML);
        });

        if (cityArray.length > 8) {
            cityArray.shift();
        }
    }
}

// clear input field when you click in it
cityInput.addEventListener('click', function (event) {
    cityInput.value = '';
})

// fetch geo data 
function weatherFetch(cityName) {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=use_your_own`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (coords) {
            var lat = coords[0].lat;
            var lon = coords[0].lon;
            var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=use_your_own`
            var requestUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=use_your_own`

            // fetch current weather forecast data
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // append current forecast data to webpage
                    document.querySelector('.current h4').textContent = data.name + ' ' + dayjs(Date.now(data.dt)).format('M/DD/YYYY');
                    document.querySelector('#icon').setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
                    document.querySelector('#icon').setAttribute('alt', data.weather[0].description);
                    document.querySelector('.current .l1').textContent = 'Temp: ' + ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.current .l2').textContent = 'Wind: ' + (data.wind.speed).toFixed(1) + ' ' + 'MPH';
                    document.querySelector('.current .l3').textContent = 'Humidity: ' + data.main.humidity + '%';
                });
            //fetch 5-day weather forecast data
            fetch(requestUrl2)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var fiveDayForecast = [];
                    for (var i = 6; i < data.list.length; i += 8) {
                        fiveDayForecast.push(data.list[i]);
                    }
                    // append 1st day forecast data to webpage
                    document.querySelector('.c1 .ch1').textContent = dayjs(fiveDayForecast[0].dt_txt).format('M/DD/YY');
                    document.querySelector('.c1 .icon1').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[0].weather[0].icon + '@2x.png');
                    document.querySelector('.c1 .icon1').setAttribute('alt', fiveDayForecast[0].weather[0].description);
                    document.querySelector('.c1 .l2').textContent = 'Temp: ' + ((fiveDayForecast[0].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c1 .l3').textContent = 'Wind: ' + (fiveDayForecast[0].wind.speed).toFixed(1) + 'MPH';
                    document.querySelector('.c1 .l4').textContent = 'Hum: ' + fiveDayForecast[0].main.humidity + '%';
                    // append 2nd day forecast data to webpage
                    document.querySelector('.c2 .ch2').textContent = dayjs(fiveDayForecast[1].dt_txt).format('M/DD/YY');
                    document.querySelector('.c2 .icon2').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[1].weather[0].icon + '@2x.png');
                    document.querySelector('.c2 .icon2').setAttribute('alt', fiveDayForecast[1].weather[0].description);
                    document.querySelector('.c2 .l2').textContent = 'Temp: ' + ((fiveDayForecast[1].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c2 .l3').textContent = 'Wind: ' + (fiveDayForecast[1].wind.speed).toFixed(1) + 'MPH';
                    document.querySelector('.c2 .l4').textContent = 'Hum: ' + fiveDayForecast[1].main.humidity + '%';
                    // append 3rd day forecast data to webpage
                    document.querySelector('.c3 .ch3').textContent = dayjs(fiveDayForecast[2].dt_txt).format('M/DD/YY');
                    document.querySelector('.c3 .icon3').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[2].weather[0].icon + '@2x.png');
                    document.querySelector('.c3 .icon3').setAttribute('alt', fiveDayForecast[2].weather[0].description);
                    document.querySelector('.c3 .l2').textContent = 'Temp: ' + ((fiveDayForecast[2].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c3 .l3').textContent = 'Wind: ' + (fiveDayForecast[2].wind.speed).toFixed(1) + 'MPH';
                    document.querySelector('.c3 .l4').textContent = 'Hum: ' + fiveDayForecast[2].main.humidity + '%';
                    // append 4th day forecast data to webpage
                    document.querySelector('.c4 .ch4').textContent = dayjs(fiveDayForecast[3].dt_txt).format('M/DD/YY');
                    document.querySelector('.c4 .icon4').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[3].weather[0].icon + '@2x.png');
                    document.querySelector('.c4 .icon4').setAttribute('alt', fiveDayForecast[3].weather[0].description);
                    document.querySelector('.c4 .l2').textContent = 'Temp: ' + ((fiveDayForecast[3].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c4 .l3').textContent = 'Wind: ' + (fiveDayForecast[3].wind.speed).toFixed(1) + 'MPH';
                    document.querySelector('.c4 .l4').textContent = 'Hum: ' + fiveDayForecast[3].main.humidity + '%';
                    // append 5th day forecast data to webpage
                    document.querySelector('.c5 .ch5').textContent = dayjs(fiveDayForecast[4].dt_txt).format('M/DD/YY');
                    document.querySelector('.c5 .icon5').setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayForecast[4].weather[0].icon + '@2x.png');
                    document.querySelector('.c5 .icon5').setAttribute('alt', fiveDayForecast[4].weather[0].description);
                    document.querySelector('.c5 .l2').textContent = 'Temp: ' + ((fiveDayForecast[4].main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + '°F';
                    document.querySelector('.c5 .l3').textContent = 'Wind: ' + (fiveDayForecast[4].wind.speed).toFixed(1) + 'MPH';
                    document.querySelector('.c5 .l4').textContent = 'Hum: ' + fiveDayForecast[4].main.humidity + '%';
                })
        })
}