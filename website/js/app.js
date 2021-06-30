
const updateUIWithWeather = (data) => {
  console.log(data);
  const target = document.querySelector('.help-tip');
  if (data) {
    target.innerText = `${data.name}, ${data.weather[0].description} ${data.main.temp}C `;
  }
  else {
    target.innerText = "Can't find that zip code";
  }
}


// check there's some postcode first
// and it's numbers only because US
const checkPostCode = (zip) => {
  if (Number.isInteger(parseFloat(zip)) && zip.length === 5) {
    return true;
  }
  else {
    updateUIWithWeather();
    return false;
  }
}



const checkWeather = async (e) => {
  e.preventDefault();
  const zip = document.getElementById('zip').value;
  const isItValid = checkPostCode(zip);
  const url = 'http://localhost:8080/weather/';
  if (isItValid) {
    const result = await fetch(url+zip);
    try {
      const data = await result.json();
      console.log(data);
      updateUIWithWeather(data);
    }
    catch (error) {
      console.log(error);
    }
  }
}

const addListeners = () => {
  document.getElementById('generate').addEventListener('click', checkWeather);
  document.getElementById('zip').addEventListener('blur', checkWeather);
}

// do the things
addListeners();
