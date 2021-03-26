#!/bin/bash -e

# Downloads the current station_information JSON and runs it through jq to put it into jsonl format.
# This is done to simulate ingestion from a static file that get's periodically updated.
# station_info.jsonl is created/updated using: ./details/get-station-info.sh > station_info.jsonl

curl -S 'https://gbfs.citibikenyc.com/gbfs/fr/station_information.json' | jq -c '.data.stations | .[]'
