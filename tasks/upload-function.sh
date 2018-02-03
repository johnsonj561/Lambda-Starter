rm ./dist/lambda-function.zip
zip -r ./dist/lambda-function.zip *
aws lambda update-function-code --function-name UserService --zip-file fileb://dist/lambda-function.zip
