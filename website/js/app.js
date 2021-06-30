
// check there's some postcode first
// and it's numbers only because US

const checkWeather = async (e) => {
  e.preventDefault();
  const zip = document.getElementById('zip').value;
  console.log(zip);
  const url = 'http://localhost:8080/weather/';
  const result = await fetch(url+zip);
  try {
    const data = await result.json();
    console.log(data);
  }
  catch (error) {
    console.log(error);
  }
}

const addListeners = () => {
  document.getElementById('weatherForm').addEventListener('submit', checkWeather)
}

// do the things
addListeners();
