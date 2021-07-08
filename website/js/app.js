
const populatePostcode = () => {
  // Check if there's a location on storage
  let storedPostcode = localStorage.getItem('storedPostcode');
  if (storedPostcode) {
    document.getElementById('zip').value = storedPostcode;
  }
}

const updateUIWithWeather = (data) => {
  const target = document.querySelector('.help-tip');
  if (data && data.cod !== "404") {
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
    localStorage.setItem('storedPostcode', zip);
    return true;
  }
  else {
    updateUIWithWeather();
    return false;
  }
}


const sendForm = async (e) => {
  e.preventDefault();
  storeFeelings()
  .then(() => displayRecentFeeling());
}

const populateRecentEntry = (data) => {
  if (data) { // if there's an entry already
    const {date, temp, content } = data;
    document.getElementById('date').innerHTML = date;
    document.getElementById('temp').innerHTML = temp + 'C';
    document.getElementById('content').innerHTML = content;
  }
}


const displayRecentFeeling = async () => {
  const url = 'http://localhost:8080/all';
  let response = await fetch(url);
  try {
    let result = await response.json();
    let data = result.reverse();
    populateRecentEntry(data[0]);
  }
  catch (error) {
    console.error(error);
  }
}

const buildPostEntry = async () => {
  // check weather
  let currentWeather = sessionStorage.getItem('weather');
  if (!currentWeather) {
      await checkWeather();
      currentWeather = sessionStorage.getItem('weather');
  }
  const weather = JSON.parse(currentWeather);
  const feelings = document.getElementById('feelings').value;
  const date = new Date();
  const rightNow = date.toLocaleString('en-gb',{
                      dateStyle: 'long',
                      timeStyle: 'short'
                    });

  return {
    'date': rightNow,
    'temp': weather.main.temp,
    'content': feelings
  }
}


const storeFeelings = async () => {
  // build the entry
  const journalEntry = await buildPostEntry();
  // sent post to API
  const url = 'http://localhost:8080/journal';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(journalEntry)
  });
  try {
    let result = await response.json();
    sessionStorage.clear('weather'); // clear to ensure we got fresh weather each time
  }
  catch (error) {
    console.error(error);
  }
}


const checkWeather = async () => {
  const zip = document.getElementById('zip').value;
  const isItValid = checkPostCode(zip);
  const url = 'http://localhost:8080/weather/';
  if (isItValid) {
    const response = await fetch(url+zip);
    try {
      const data = await response.json();
      sessionStorage.setItem('weather', JSON.stringify(data))
      updateUIWithWeather(data);
    }
    catch (error) {
      console.error(error);
    }
  }
}

const start = () => {
  populatePostcode();
  displayRecentFeeling();
  document.getElementById('generate').addEventListener('click', sendForm);
  document.getElementById('zip').addEventListener('blur', checkWeather);
}

// do the things
start();
