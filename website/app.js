// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=6c7ea660d0862c6eaca84f556c7da241' + '&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;  
    console.log(newDate);

    getWeatherData(baseURL, zipCode, apiKey)
    .then(function (data) {
        postData('http://localhost:7000/addWeatherData', 
        {temperature: data.main.temp, date: newDate, user_res: userFeeling } )
        .then(function() {
            updateUI()
        })
    })
}

/* Function to GET Web API Data */

const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL + zipCode + apiKey);
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    };
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

/* Function to GET Project Data */
const updateUI = async() => {
    const request = await fetch('http://localhost:7000/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_res;
    } catch (error) {
        console.log('error', error);
    }
}