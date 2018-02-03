aws lambda invoke --function-name UserService --payload file://event.json ./function-response.json
cat ./function-response.json | python -m json.tool
rm ./function-response.json
