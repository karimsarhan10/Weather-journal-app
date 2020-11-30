// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 7000;

// Spin up the server
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};



// GET ROUTE returns projectData

app.get('/all', (request, response) => {
        response.send(projectData);
    });



// POST ROUTE

app.post('/addWeatherData', addData)

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.user_res = request.body.user_res;
    response.end();
    console.log(projectData)
}



