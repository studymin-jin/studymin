var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});
const tableName = "Trees";

exports.handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  let response = "";
  try {
    var params = {
      TableName: tableName,
    };

    const trees = await documentClient.scan(params).promise();

    response = {
      statusCode: "200",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(trees),
    };
  } catch (exception) {
    console.error(exception);

    response = {
      statusCode: "500",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ "Message: ": exception }),
    };
  }

  return response;
};
