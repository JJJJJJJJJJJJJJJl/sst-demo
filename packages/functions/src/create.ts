import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

// local noteIds -> 6c7c05f0-1b47-11ef-8120-bbfcbce0805b & b0feb2b0-1b45-11ef-add6-b785187f50d2

export const main = handler(async (event) => {
	console.log("1")
	let data = {
		content: "",
		attachment: "",
	};

	if (event.body != null) {
		data = JSON.parse(event.body);
	}

	const params = {
		TableName: Table.Notes.tableName,
		Item: {
			// The attributes of the item to be created
			userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
			noteId: uuid.v1(), // A unique uuid
			content: data.content, // Parsed from request body
			attachment: data.attachment, // Parsed from request body
			createdAt: Date.now(), // Current Unix timestamp
		},
	};

	await dynamoDb.put(params);

	return JSON.stringify(params.Item);
});