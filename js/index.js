//variaveis e seleção de eventos
const apiKey = "8e9e7a5ffc0484f2465a00366ce9a208";
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement  = document.querySelector("#city");
const tempElement  = document.querySelector("#temperature span");
const descElement  = document.querySelector("#description");
const weatherIconElement  = document.querySelector("#weather-icon");
const countryElement  = document.querySelector("#country");
const umidityElement  = document.querySelector("#umidity span");
const windElement  = document.querySelector("#wind span");

//funções
const getWeatherData = async(city, lat, lon) =>{
    const apiWeatehrURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatehrURL);
    const weatherData = await res.json();

    return weatherData;
}

const getGeoData = async(city) =>{

    const apiLatLonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

    const res = await fetch(apiLatLonURL);
    const geoData = await res.json();

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    return getWeatherData(city, lat, lon);
}


const showWeatherData =  async (city) =>{
    const data = await getGeoData(city);

    cityElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${ data.weather[0].icon}.png`)
    countryElement.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`)
    umidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`

    console.log(data)

    const weatherDiv = document.querySelector("#weather-data").classList.remove("hide")
}

//eventos

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city)
})


cityInput.addEventListener("keyup", (e)=>{
    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city)

    }

})

//pegar os dados lat e long