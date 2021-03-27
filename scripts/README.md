# Demo scripts

These scripts are here to make it easy to run a demo. They can either be executed directly, or else you can copy commands out to paste in a terminal.
All these scripts are intended to be run from the repository root, e.g. `./scripts/add-station-info.sh`.

The intended order of execution is:

1. First teminal: `flowctl develop --source flow.yaml --port 8080`
2. Second Terminal: `./scripts/add-station-info.sh` (ingests `station_info.jsonl`)
3. Second Terminal: `./scripts/add-station-statuses.sh` (ingests `initial-statuses.json` followed by continuous updates)
4. Third Terminal: `./scripts/query-materialization.sh` (shows current results)
