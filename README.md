# Flow Citi-Bike Demo

This repository contains a demo project that uses Flow to process both realtime and batch data from publicly available datasets.

The Flow documentation is available at (https://docs.estuary.dev/). The docs may provide a more friendly introduction, since this repository is designed with a human narrator in mind.

## What it does

This demo takes "batch" data describing bike share stations and joins it with a realtime feed of station status information. The results are materialized into a database and kept up to date in realtime.

The batch station information is in `station_info.jsonl`. This file contains data like the name and location of each station. It is ingested into flow using `./scripts/add-station-info.sh`.

The realtime status data is fetched from the GBFS feed at `https://gbfs.citibikenyc.com/gbfs/en/station_status.json` and forwarded into flow continuously using `./scripts/add-station-statuses.sh`, which runs until you stop it using `ctrl-c`.