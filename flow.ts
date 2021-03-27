import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation flow.yaml#/collections/demo~1citi-bike~1available-by-station/derivation.
export class DemoCitiBikeAvailableByStation implements interfaces.DemoCitiBikeAvailableByStation {
    fromStationInfoUpdate(
        source: collections.DemoCitiBikeStationInformation,
    ): registers.DemoCitiBikeAvailableByStation[] {
        return [source];
    }
    fromStationStatusPublish(
        source: collections.DemoCitiBikeStationStatus,
        register: registers.DemoCitiBikeAvailableByStation,
        previous: registers.DemoCitiBikeAvailableByStation,
    ): collections.DemoCitiBikeAvailableByStation[] {
        if (register != null) {
            return [{
                name: register.name,
                lat: register.lat,
                lon: register.lon,
                capacity: register.capacity,
                post_code: register.post_code,
                rental_methods: register.rental_methods,
                ...source
            }];
        } else {
            return [];
        }
    }
}
