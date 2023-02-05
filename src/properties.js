const PropertiesReader          = require('properties-reader');
const properties                = PropertiesReader('../resources/application.properties');

const exportProperties = {
    awsDynamoDbProductsTable  : properties.get("aws.dynamodb.products.table"),
    awsIamAuthAccessKeyId     : properties.get("aws.iamAuth.accessKeyId"),
    awsIamAuthSecretAccessKey : properties.get("aws.iamAuth.secretAccessKey"),
    awsRegion                 : properties.get("aws.region"),
    port                      : properties.get("port")
}

module.exports = exportProperties;