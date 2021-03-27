#!/bin/bash -e

# Downloads the current station_information JSON and runs it through jq to put it into jsonl
# format. This is done to simulate ingestion from a static file that get's periodically updated.
# station_info.jsonl is created/updated using: ./scripts/get-station-info.sh > station_info.jsonl
# This is mostly here as documentation, since this script probably won't need to be run during the
# actual demo.

curl -S 'https://gbfs.citibikenyc.com/gbfs/fr/station_information.json' | jq -c '.data.stations | .[]'
