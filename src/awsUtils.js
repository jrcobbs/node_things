const AWS = require('aws-sdk');
const properties       = require('./properties');
//configure AWS sdk
AWS.config.update({
    region: properties.awsRegion,
    accessKeyId: properties.awsIamAuthAccessKeyId,
    secretAccessKey: properties.awsIamAuthSecretAccessKey
  });

const params = {
    TableName: properties.awsDynamoDbProductsTable
  };

let dynamoDbUtils = {
    client: new AWS.DynamoDB.DocumentClient(),
    params: params,

    getParams() {
        return this.params;
    },
    setParams(params) {
        this.params = params;
    }
}
let awsUtils = {
    dynamoDbUtils: dynamoDbUtils
}

module.exports = awsUtils;