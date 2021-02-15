const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}


async function main(withIp = true){

    let country;

    if(withIp){

        const ip = await fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(json => json.ip)
            // console.log('---ip---',ip);


            

        country = await fetch(`http://api.ipstack.com/${ip}?access_key=559d9ca5a2aca5a860673d5893b2a113`)
            .then(response => response.json())
            .then(json => json.city)
            // console.log('---loc---', country);
    }else{
        country = document.querySelector('#ville').textContent;
    }


    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&lang=fr&appid=a56bebdc973c623464e7885da32d7c2d`)
        .then(response => response.json())
        .then(json => json)
        console.log('---weather---', weather);  
        
    displayWeatherInfos(weather)
}    

function displayWeatherInfos(data){
    const name = data.name;
    const temp = Math.round(data.main.temp - 273.15);
    const main = data.weather[0].main;
    const description = data.weather[0].description;
    const wind = Math.round(data.wind.speed);

    document.querySelector('#ville').textContent = name;
    document.querySelector('#température').textContent = temp + "°C";
    document.querySelector('#conditions').textContent = "(" + description + ")";
    document.querySelector('.wi').className = weatherIcons[main];
    document.querySelector('#wind').textContent =  "Wind : " + wind + " km/h";
    document.body.className = main.toLowerCase();
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
    ville.textContent = "";
})

ville.addEventListener('keydown', (e) => {
    if(e.keyCode=== 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();