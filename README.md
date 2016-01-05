#Arnold Schwarzenegger movie quote API
RESTful API web service that delivers Arnold Schwarzenegger movie quotes, written in NodeJS using the Express framework.

###Before we start the API.
Start by downloading the project from git and setup your own MongoDB either locally or online.
Make sure to replace the MongoDB uri in the server.js file on line 10, to your own MongoDB URI.
Make sure that you copy the content of the quotes_database.json file and insert it to your own MongoDB.
```javascript
mongoose.connect('<your MongoDB URI>');
```
###How to start?
Now that we have set up our database it's time to start the API.
First make sure that you have NodeJS installed on your computer, if not do that first.

Then run this simple command in your terminal to install the packages needed for the project.
```
npm install
```
Now that we have our packages we start the API by running this command in the terminal.
```
npm start
```
There is now a server on localhost:8080 running the API.

###Endpoints.
GET /quotes
Returns the whole database of quotes.
```
GET http://localhost:8080/quotes
```
GET /quotes/:id
Returns the quote assigned to the ID specified. There is a total of a 100 quotes.
```
GET http://localhost:8080/quote/56
```
