const express         = require('express');
const dynamoDbService = require("./dynamoDbService")
const properties      = require("./properties")
var bodyParser        = require('body-parser')

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/products', dynamoDbService);

// Start server
const port = properties.port;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});