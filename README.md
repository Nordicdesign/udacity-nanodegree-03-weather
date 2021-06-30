# Udacity Weather Journal project

Asyncronous web app that captures the user's feelings, and stores them with the weather information of the user's location. Keeps a log of weather info and feelings.

## Key features

* Fetch the weather
* Store weather and user's feelings
* Display a record of all entries

## Libraries used

* express
* body-parser
* cors
* nodemon
* dotenv
* node-fetch

## Considerations

### API key

Looks like the course expected the call to OpenWeatherMap to fetch the weather to be made from the client, but that would expose the API key to the public eye. Or at least I don't know how to hide it without using environment variables, which can then be read in the server.

To get this to work locally, you'll need to add your key to a `.env` variable called `OPEN_WEATHER`.

### Hot reloading

Nodemon added to speed up development.

### Node-fetch

As it looks like node.js does not support fetch API by default, I had to install this package.
