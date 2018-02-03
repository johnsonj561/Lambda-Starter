aws lambda invoke --function-name UserService ./function-response.json
cat ./function-response.json | python -m json.tool
