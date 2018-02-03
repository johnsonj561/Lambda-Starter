const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

function getItem(params) {
  return new Promise((resolve, reject) => {
    documentClient.get(params, (err, data) => {
      if(err) reject(getErrorResponse(err, `Error looking up user: ${params.Key.username}`));
      else if(!data.Item) resolve(getErrorResponse(null, `User not found: ${params.Key.username}`));
      else resolve(getSuccessResponse(null, data));
    })
  });
}

function postItem(params) {
  return putItem(params);
}

function putItem(params) {
  return new Promise((resolve, reject) => {
    documentClient.put(params, (err, data) => {
      if(err) reject(getErrorResponse(err, `Error saving user: ${params.Item.username}`));
      else resolve(getSuccessResponse('User Saved', data));
    });
  });
}

function deleteItem(params) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

function getSuccessResponse(message, data) {
  return {
    success: true,
    message: message,
    data: data
  }
}

function getErrorResponse(err, message, data) {
  return {
    success: false,
    message: message,
    error: err,
    data: data
  }
}

module.exports = {
  getItem,
  postItem,
  putItem,
  deleteItem
}