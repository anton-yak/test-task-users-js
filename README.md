Related repository: [test-task-user-history-ts](https://github.com/anton-yak/test-task-user-history-ts) (service for collecting events from this service)

How to run service:
```bash
docker compose build && docker compose up
```

If you have node.js installed, you can also run service locally using commands:
```bash
npm install
./run_locally.sh
docker compose up db -d
```

After starting up service you can access it by address http://localhost:8080

Example requests:

`GET /api/v1/users`
___
`POST /api/v1/users`
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "qwerty",
    "fullName" : "Tester Testerov"
}
```
___
`PUT /api/v1/users/1`
```json
{
    "email": "test@example.com",
    "password": "qwerty",
    "fullName" : "Tester Testerov"
}
```
