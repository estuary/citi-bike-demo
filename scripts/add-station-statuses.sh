#!/bin/bash -e

DATA_URL='https://gbfs.citibikenyc.com/gbfs/en/station_status.json'

# First add a "starter" dataset. This will intentionally have somewhat older data, so that the
# subsequent updates will be certain to have different values. Station statuses may not change
# quickly when the weather is bad, and this just ensures that there will be some observed changes
# during the demo. This also ensure that we can still run the demo without network access, albeit
# without continuous updates.
cat initial-statuses.json | \
    jq -c '.data.stations | .[]' | \
    # the -d "\n" is required, or else the curl -d argument won't get properly quoted
    xargs -n 1 -I '{}' -d "\n" \
    curl -SH 'Content-Type: application/json' -d '{}' http://localhost:8080/ingest/demo/citi-bike/station-status

# Pause to run a sql query
sleep 15

while true; do
    echo fetching $DATA_URL
    curl -S "$DATA_URL" | \
        jq -c '.data.stations | .[]' | \
        xargs -n 1 -I '{}' -d "\n" \
        curl -SH 'Content-Type: application/json' -d '{}' http://localhost:8080/ingest/demo/citi-bike/station-status

        # Just to make sure we don't get rate limited by the API
        sleep 10
done
