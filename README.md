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
