const express          = require('express');

const { error }        = require('console');
const router           = express.Router();
const { v4: uuidv4 }   = require('uuid');
const properties       = require('./properties');
const awsUtils         = require("./awsUtils");
// Configure AWS SDK


// Create DynamoDB client
const dynamoDb = awsUtils.dynamoDbUtils.client;
const params   = awsUtils.dynamoDbUtils.getParams();
  // GET all products
router.get('/all', (req, res) => {
    // Scan table for all products
    dynamoDb.scan(params, (error, data) => {
      if (error) {
        res.status(400).json({ error: 'Error fetching products' });
        console.log(error);
      } else {
        res.json(data.Items);
      }
    });
  });
  // GET Products less than 15 dollars
  router.get('/under15', (req, res) => {
    // Scan table for all products
    dynamoDb.scan(params, (error, data) => {
      if (error) {
        res.status(400).json({ error: 'Error fetching products' });
        console.log(error);
      } else {
        res.json(data.Items.filter(product => product.productPrice < 15.00));
      }
    });
  });
  
  router.post('/createProduct', (req,res) => {
    let product = {
        id: uuidv4(),
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productQuantity: req.body.productQuantity
    }
    const params = {
        TableName: properties.awsDynamoDbProductsTable,
        Item: product
      };
    dynamoDb.put(params, (error, data) => {
        if (error) {
          res.status(400).json({ error: 'Error writing product' });
          console.log(error);
        } else {
          res.status(200).json({ error: 'Product updated' });
          console.log(product);
        }
    });
  });

  router.get('/search:productName', (req, res) => {
    // Scan table for all products
    const searchKey = req.params.productName.split(":")[1]
    dynamoDb.scan(params, (error, data) => {
      if (error) {
        res.status(400).json({ error: 'Error fetching products' });
        console.log(error);
      } else {
        res.json(data.Items.filter(product => product.productName.startsWith(searchKey)));
      }
    });
  });

  router.put('/updateProduct', (req,res) => {
    let product = {
        id             : req.body.id,
        productName    : req.body.productName,
        productPrice   : req.body.productPrice,
        productQuantity: req.body.productQuantity
    }
    const params = {
        TableName: properties.awsDynamoDbProductsTable,
        Item: product
      };
    dynamoDb.put(params, (error, data) => {
        if (error) {
          res.status(400).json({ error: 'Error updating product' });
          console.log(error);
        } else {
          res.status(200).json({ error: 'Product updated' });
          console.log(product);
        }
    });
  });
    module.exports = router;