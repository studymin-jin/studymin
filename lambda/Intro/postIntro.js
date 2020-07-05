var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});
const tableName = "Articles";

exports.handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  let response = "";
  try {
    const body = JSON.parse(event.body);
    var params = {
      TableName: tableName,
      Item: {
        id: body.id,
        title: body.title,
        content: body.content,
        writer: body.writer,
        regdt: body.regdt,
        moddt: body.moddt,
      },
    };
    await documentClient.put(params).promise();

    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id: body.id }),
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
