#!/bin/bash -e

URL='https://gbfs.citibikenyc.com/gbfs/en/station_status.json'

while true; do
    echo fetching $URL
    curl -S "$URL" | \
        jq -c '.data.stations | .[]' | \
        xargs -n 1 -I '{}' -d "\n" \
        curl -SH 'Content-Type: application/json' -d '{}' http://localhost:8080/ingest/demo/citi-bike/station-status

        sleep 10
done
