#!/bin/bash -e

sqlite3 -header demo-materialization.db 'select name, lat, lon, num_bikes_available, num_docks_available, capacity from available_by_station order by num_bikes_available desc limit 10;'