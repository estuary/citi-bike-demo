#!/bin/bash -e

cat station_info.jsonl | websocat --protocol json/v1 ws://localhost:8080/ingest/demo/citi-bike/station-information