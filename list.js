import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.TableName,

        // defines the condition for the query 'userId = :userId':
        // only return items with matching 'userId' partition key
        KeyConditionExpression: "userId = :userId",

        //defines the value in the condition
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
          }
    };

    const result = await dynamoDb.query(params);

    return result.Items;
});