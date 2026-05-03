async function getWeather(city) {
    try {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function showWeather(city) {
    const data = await getWeather(city);

    if (!data) {
        alert('Something went wrong, please try again later');
        return;
    }

    const val = (v) => (v !== undefined && v !== null) ? v : 'N/A';

    const icon = document.getElementById('weather-icon');
    icon.src = val(data.weather?.[0]?.icon);
    icon.alt = val(data.weather?.[0]?.description);

    document.getElementById('location').textContent = val(data.name);
    document.getElementById('weather-main').textContent = val(data.weather?.[0]?.main);

    document.getElementById('main-temperature').textContent =
        data.main?.temp !== undefined ? `${data.main.temp}°C` : 'N/A';
    document.getElementById('feels-like').textContent =
        data.main?.feels_like !== undefined ? `${data.main.feels_like}°C` : 'N/A';
    document.getElementById('humidity').textContent =
        data.main?.humidity !== undefined ? `${data.main.humidity}%` : 'N/A';
    document.getElementById('wind').textContent =
        data.wind?.speed !== undefined ? `${data.wind.speed} m/s` : 'N/A';
    document.getElementById('wind-gust').textContent =
        data.wind?.gust !== undefined ? `${data.wind.gust} m/s` : 'N/A';

    document.getElementById('weather-display').classList.add('weather-card-visible');
}

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-select').value;
    if (!city) return;
    showWeather(city);
});
