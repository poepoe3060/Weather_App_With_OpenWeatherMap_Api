const apiKey = "a5b2b4fa50692b2c66cc3222443e6da9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Map weather conditions to icons
        const weatherMap = {
            "Clouds": "images/clouds.png",
            "Clear": "images/clear.png",
            "Rain": "images/rain.png",
            "Drizzle": "images/drizzle.png",
            "Mist": "images/mist.png"
        };

        weatherIcon.src = weatherMap[data.weather[0].main] || "images/default.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error(error);
    }
}

// Click event
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Enter key event
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});


























