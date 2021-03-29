#!/bin/bash
wget --no-clobber https://s3.amazonaws.com/tripdata/202102-citibike-tripdata.csv.zip

# Pipe CSV rows into Flow's CSV WebSocket ingestion API.
unzip -p 202102-citibike-tripdata.csv.zip \
    | csvtool col 12,2-4,8,13-14 - \
    | pv --line-mode --quiet --rate-limit 500 \
    | websocat --protocol csv/v1 ws://localhost:8080/ingest/demo/citi-bike/rides