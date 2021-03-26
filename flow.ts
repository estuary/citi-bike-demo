import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation flow.yaml#/collections/demo~1citi-bike~1available-by-station/derivation.
export class DemoCitiBikeAvailableByStation implements interfaces.DemoCitiBikeAvailableByStation {
    fromStationInfoUpdate(
        source: collections.DemoCitiBikeStationInformation,
    ): registers.DemoCitiBikeAvailableByStation[] {
        return [{info: source}];
    }
    fromStationStatusPublish(
        source: collections.DemoCitiBikeStationStatus,
        register: registers.DemoCitiBikeAvailableByStation,
        previous: registers.DemoCitiBikeAvailableByStation,
    ): collections.DemoCitiBikeAvailableByStation[] {
        if (register.info) {
            return [{info: register.info, status: source}];
        } else {
            return [];
        }
    }
}
