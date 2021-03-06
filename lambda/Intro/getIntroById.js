var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});
const tableName = "Trees";

exports.handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  let response = "";
  try {
    const id = event.pathParameters.id;
    var params = {
      TableName: tableName,
      Key: { id: id },
    };
    const tree = await documentClient.get(params).promise();

    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(tree),
    };
  } catch (exception) {
    console.error(exception);
    response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ "Message: ": exception }),
    };
  }
  return response;
};
