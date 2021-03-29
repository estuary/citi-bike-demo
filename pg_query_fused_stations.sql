select station_id,
    name,
    lat,
    lon,
    capacity,
    ride_in,
    ride_out,
    move_in,
    move_out,
    bikes
from stations_fused
order by name asc;