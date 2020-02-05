const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = "f0f1b43e1026e1fcefdc6aeb9237ce53";
// https://home.openweathermap.org/api_keys 여기에서 로그인후 key 복사

function getWeather(lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude; // 좌표 저장
    const longitude = position.coords.longitude;
    const coordsObj = {  // 객체로 저장해서 saveCoords함수로 localStorage에 저장.
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError() { // 에러낫을떄
    conosole.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
    //navigator로 위치 불러옴
    // getCurrentPosition() 은 callback함수 , Error 임
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();