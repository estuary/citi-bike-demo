import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation 2_derive.flow.yaml#/collections/demo~1citi-bike~1rides-and-relocations/derivation.
export class DemoCitiBikeRidesAndRelocations implements interfaces.DemoCitiBikeRidesAndRelocations {
    fromRidesUpdate(source: collections.DemoCitiBikeRides): registers.DemoCitiBikeRidesAndRelocations[] {
        // Index ending station for this bike.
        return [source.end];
    }
    fromRidesPublish(
        source: collections.DemoCitiBikeRides,
        _register: registers.DemoCitiBikeRidesAndRelocations,
        previous: registers.DemoCitiBikeRidesAndRelocations,
    ): collections.DemoCitiBikeRidesAndRelocations[] {
        // Compare |previous| register value from before the update lambda was applied,
        // with the source document to determine if the bike mysteriously moved.
        if (previous.station_id != '' && previous.station_id != source.begin.station_id) {
            return [{ bike_id: source.bike_id, begin: previous, end: source.begin, relocation: true }, source];
        }
        return [source];
    }
}

// Implementation for derivation 2_derive.flow.yaml#/collections/demo~1citi-bike~1station-fused/derivation.
export class DemoCitiBikeStationsFused implements interfaces.DemoCitiBikeStationsFused {
    fromStationAttributesPublish(
        source: collections.DemoCitiBikeStationAttributes,
        _register: unknown,
        _previous: unknown,
    ): collections.DemoCitiBikeStationsFused[] {
        return [source];
    }
    ridesAndMovesPublish(
        source: collections.DemoCitiBikeRidesAndRelocations,
        _register: registers.DemoCitiBikeStationsFused,
        _previous: registers.DemoCitiBikeStationsFused,
    ): collections.DemoCitiBikeStationsFused[] {
        if (source.relocation) {
            return [
                {
                    station_id: source.begin.station_id,
                    move_out: 1,
                    stable: { remove: [source.bike_id] },
                },
                {
                    station_id: source.end.station_id,
                    move_in: 1,
                    stable: { add: [source.bike_id] },
                },
            ];
        } else {
            return [
                {
                    station_id: source.begin.station_id,
                    ride_out: 1,
                    stable: { remove: [source.bike_id] },
                },
                {
                    station_id: source.end.station_id,
                    ride_in: 1,
                    stable: { add: [source.bike_id] },
                },
            ];
        }
    }
}
