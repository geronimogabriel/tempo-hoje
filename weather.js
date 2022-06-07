// pegando o valor no localStorage
const locationStorage = localStorage.getItem('location')

// selecionando o botao
const loc = document.querySelector('.text')

// verificando se o valor existe no localStorage
if (locationStorage) {
  loc.value = locationStorage.replace("%20", " ").replace("%20", " ")
}

// adicionar localStorage
document.querySelector('.btn input').addEventListener('change', () => {
  localStorage.setItem('location', loc.value.replace(/ /g, "%20"))
  location.reload()
})

// consumindo a API de tempo
var URL = `http://api.openweathermap.org/data/2.5/weather?q=${loc.value}&lang=pt_br&units=metric&APPID=a408abbecea77d727f8b03d755aafde2`
var req = new XMLHttpRequest();
req.open('GET', URL);
req.responseType = 'json'
req.send()

req.onload = function () {
  var weather = req.response;
  console.log(weather)
  let infoCity = document.querySelector(".city")
  let city = weather.name
  infoCity.innerHTML = `${city}, ${weather.sys.country}`

  let infoTemp = document.querySelector(".tempo")
  let temp = weather.main.temp + ""
  infoTemp.innerHTML = `${Math.round(temp)}<code>&deg;</code>C`

  let infoDesc = document.querySelector(".descricao")
  let tempo = weather.weather[0].description
  infoDesc.innerHTML = tempo
  let icon = document.querySelector(".icon")
  if (hora <= 17) {
    if (tempo == "nublado" || tempo == "nuvens dispersas") {
      icon.innerHTML = `<i class="wi wi-day-cloudy"></i>`
    }
  } else {
    if (tempo == "nublado" || tempo == "nuvens dispersas") {
      icon.innerHTML = `<i class="wi wi-night-alt-cloudy"></i>`
    }

  }

  let infoHumi = document.querySelector('.umidade__info')
  let hum = weather.main.humidity
  infoHumi.innerHTML = hum + "%"

  let infoWind = document.querySelector(".vento__info")
  let wind = weather.wind.speed * 3.627
  infoWind.innerHTML = Math.round(wind) + " Km/h"
}

let data = new Date()
let diaSem = data.getDay()
let day = data.getDate()
let mes = data.getMonth()
let ano = data.getFullYear()
hora = data.getHours()


let semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
let meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]


function adicionaZero(numero) {
  if (numero <= 9)
    return "0" + numero;
  else
    return numero;
}

document.querySelector(".semana").innerHTML = semana[diaSem]
document.querySelector(".date").innerHTML = `${adicionaZero(day)} ${meses[mes]} ${ano}`
