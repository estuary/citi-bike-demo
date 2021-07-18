SELECT
    "name",
    "region",
    "capacity",
    stationtype,
    "arrival/ride",
    "departure/ride",
    "arrival/move",
    "departure/move",
    currentbikes
FROM citi_stations
WHERE "arrival/ride" IS NOT NULL
ORDER BY "arrival/ride" DESC;