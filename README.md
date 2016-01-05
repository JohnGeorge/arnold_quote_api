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
1. First make sure that you have NodeJS installed on your computer, if not do that first.

2. Then run these simple commands in your terminal to install the packages used for the project.
```
npm install
```
3. Now that we have our packages we start the API by running this command in the terminal.
```
npm start
```
