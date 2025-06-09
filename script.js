const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace this with your actual API key
const button = document.getElementById('getWeather');
const result = document.getElementById('weatherResult');

button.addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city === "") {
    result.innerHTML = "Please enter a city name.";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].description;
      const humidity = data.main.humidity;

      result.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${condition}</p>
        <p>Humidity: ${humidity}%</p>
      `;
    })
    .catch(error => {
      result.innerHTML = `Error: ${error.message}`;
    });
});
