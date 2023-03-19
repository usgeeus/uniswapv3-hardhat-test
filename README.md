Error: listen EADDRINUSE: address already in use 127.0.0.1:8545
```
lsof -i:8545
kill -9 <process_id>
```