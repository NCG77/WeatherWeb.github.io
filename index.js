const Box = document.querySelector('.Box');
const search = document.querySelector('.searchBox button');
const weatherBox = document.querySelector('.weatherbox');
const weatherDetails = document.querySelector('.weatherdetails');
const Notfound = document.querySelector('.InvalidLocation');

search.addEventListener('click', () => {

    const APIKey = '882b8849af2ef89cb3e86e913639f382';
    const city = document.querySelector('.searchBox input').value;
    
    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                Box.style.height = '250px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                Notfound.style.display = 'block';
                Notfound.classList.add('fadeIn');
                return;
            }

            Notfound.style.display = 'none';
            Notfound.classList.remove('fadeIn');

            const image = document.querySelector('.weatherbox img');
            const temperature = document.querySelector('.weatherbox .temperature');
            const description = document.querySelector('.weatherbox .details');
            const humidity = document.querySelector('.weatherdetails .humidity span');
            const wind = document.querySelector('.weatherdetails .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'sun.png';
                    break;

                case 'Rain':
                    image.src = 'rainy-day.png';
                    break;

                case 'Snow':
                    image.src = 'snowing.png';
                    break;

                case 'Clouds':
                    image.src = 'cloudy.png';
                    break;

                case 'Haze':
                    image.src = 'wind.png';
                    break;

                default:
                    image.src = '';
            }

                temperature.innerHTML = `${parseInt(json.main.temp)-273} <span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                Box.style.height = '590px';


        });


});