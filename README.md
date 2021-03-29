# Flow Citi-Bike Demo

This repository contains a demo project that uses Flow to fuse realtime and batch data from publicly available datasets.

The Flow documentation is available at (https://docs.estuary.dev/). The docs may provide a more friendly introduction, since this repository is designed with a human narrator in mind.

## What it does

This demo models a dataset describing bike share stations and joins it with a feed of bike rides to provide a continuously updated view of fused station metadata, statistics, and bike availability. The results are materialized into a database and kept up to date in realtime.

Catalog sources are organized to be walked through as part of a demo:

* `1_capture.flow.yaml` - Characterizes upstream data systems and collections into which station attributes and rides are captured.
* `2_derive.flow.yaml` - Derives a fused view of stations which includes attributes, bike statistics, and a current stable of bikes.
* `3_materialize.flow.yaml` - Defines an endpoint and materialization for the fused stations view.
* `4_tests.flow.yaml` - Tests the collections and derivations of this catalog.

## Usage

This example is meant to run as a VSCode devcontainer, with an integrated PostgreSQL database.

```console
# Run catalog tests.
$ flowctl test --source 4_tests.flow.yaml

# Start a local development session.
$ flowctl develop --source 3_materialize.flow.yaml --port 8080

# Examine the `stations_fused` table created in the integrated PostgreSQL DB.
# See pg_query_fused_stations.sql

# Load station attributes dataset. Try querying again.
$ ./scripts/load-station-attributes.sh

# Start streaming in rides. Keep querying.
$ ./scripts/stream-rides.sh

# Clean up `flowctl_develop` directory.
# Also run `pg_reset_tables.sql` to drop created tables
$ git clean -f -d
```

## Data Sources used in this demo

This demo uses data from the GBFS feed provided by citi-bike.

- [Citi-Bike System Data Homepage](https://www.citibikenyc.com/system-data)
- [GBFS Feed Specification](https://github.com/NABSA/gbfs)