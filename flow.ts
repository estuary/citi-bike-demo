import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation flow.yaml#/collections/demo~1citi-bike~1available-by-station/derivation.
export class DemoCitiBikeAvailableByStation implements interfaces.DemoCitiBikeAvailableByStation {
    fromStationInfoUpdate(
        source: collections.DemoCitiBikeStationInformation,
    ): registers.DemoCitiBikeAvailableByStation[] {
        return [{ info: source }];
    }
    fromStationInfoPublish(
        source: collections.DemoCitiBikeStationInformation,
        register: registers.DemoCitiBikeAvailableByStation,
        _previous: registers.DemoCitiBikeAvailableByStation,
    ): collections.DemoCitiBikeAvailableByStation[] {
        if (register.status) {
            // The ! here are to tell the Typescript compiler to assert that these
            // aren't null, which we know to be true.
            return [join(source, register.status)];
        } else {
            return []; // Nothing to publish since we don't know the status yet
        }
    }

    // Save the status in a register so it can be published when station info is updated.
    fromStationStatusUpdate(source: collections.DemoCitiBikeStationStatus): registers.DemoCitiBikeAvailableByStation[] {
        return [{ status: source }];
    }
    fromStationStatusPublish(
        source: collections.DemoCitiBikeStationStatus,
        register: registers.DemoCitiBikeAvailableByStation,
        _previous: registers.DemoCitiBikeAvailableByStation,
    ): collections.DemoCitiBikeAvailableByStation[] {
        if (register.info) {
            return [join(register.info, source)];
        } else {
            return []; // nothing to publish because we don't know the info yet
        }
    }
}

// Combines a station info and status document into the output document.
function join(
    info: collections.DemoCitiBikeStationInformation,
    status: collections.DemoCitiBikeStationStatus,
): collections.DemoCitiBikeAvailableByStation {
    return {
        name: info.name,
        lat: info.lat,
        lon: info.lon,
        capacity: info.capacity,
        post_code: info.post_code,
        rental_methods: info.rental_methods,
        ...status,
    };
}
