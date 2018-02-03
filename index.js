const DynamoService = require('./services/dynamo.service');
const User = require('./models/user.model');

exports.handler = (event, context, callback) => {
    
  const params = { TableName: 'jmjdevwork.users' };
  const formData = event.formData;
  let newUser, userError, dynamoPromise;

  /**
   * POST User
   */
  if(event.httpMethod === 'post') {
    newUser = new User(formData);
    newUser.bcrypt();
    userError = newUser.hasError();
    evaluateError(userError);
    params.Item = newUser;
    DynamoService.postItem(params)
      .then(resp => callback(null, resp))
      .catch(err => callback(JSON.stringify(err)));
  }

  /**
   * PUT User
   */
  else if(event.httpMethod === 'put') {
    params.Key = { username: formData.username };
    DynamoService.getItem(params)                 // look up user
      .then(resp => {
        if(!resp.success) callback(resp.message);
        return resp.data.Item;
      })
      .then(user => {        
        newUser = new User();                     // update user
        newUser.username = formData.username;
        newUser.token = formData.token;
        if(formData.password && formData.password.length) {
          newUser.password = formData.password;
          newUser.bcrypt();
        }
        userError = newUser.hasError();
        evaluateError(userError);
        params.Item = newUser.getObject();        // save changes
        DynamoService.putItem(params).then(resp => callback(null, resp));
      })
      .catch(err => callback(err));
  } 
  
  /**
   * GET User
   */
  // TODO
  else if(event.httpMethod === 'get' || event.httpMethod === 'delete') {
    DynamoService.getItem(params)
      .then(resp => callback(null, 'Get/Delete success'))
      .catch(err => callback(err));
  }

};

function evaluateError(error) {
  if(error) callback(error);
  // TODO
  // create reusable error handling service that integrates with logging/storage
}