#!/bin/bash
env PGUSER=api \
    PGHOST=localhost \
    PGDATABASE=users \
    PGPORT=5432 \
    PGPASSWORD=12345 \
    USER_HISTORY_URL=http://localhost:8081 \
    node src/index.js
