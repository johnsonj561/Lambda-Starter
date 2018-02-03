### AWS Lambda Starter

A project for getting started with AWS Lambda functions. 

Currently working on converting [Project-Portfolio] to serverless. This will be used as a Lambda generator for future functions associated with this project.

[AWS-CLI] must be configured before running upload/invoke scripts.

#### Event Payload
A payload can be defined as JSON in event.json for testing purposes.

#### Upload Lambda to AWS
```npm run upload-lambda```  
Executes [upload-function.]. Script removes any existing zip file, compresses project into dist/main.zip, then uploads zip to AWS.  

#### Invoke Lambda
```npm run invoke-lambda```  
Executes [invoke-function] Invokes the Lambda function with no payload and prints results to console.  

#### Invoke Lambda with Payload
```npm run invoke-lambda-payload```  
Execute [invoke-function-w-payload] Invokes the Lambda function with the payload defined in event.json.  

#### Lambda Handler
The Lambda Handler is defined in index.js. As the UserService entry point, index.js will parse the event, call the appropriate User method, and terminate execution by invoking the handler's callback method.  

#### DynamoDB DocumentClient
Service DynamoService is a wrapper for DynamoDB's DocumentClient.



[Project-Portfolio]:https://github.com/johnsonj561/Project-Portfolio
[AWS-CLI]:https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
[upload-function]:./tasks/upload-function.sh
[invoke-function]:./tasks/invoke-function.sh
[invoke-function-w-payload]:./tasks/invoke-function-w-payload.sh