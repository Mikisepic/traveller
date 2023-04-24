import { Base } from '@traveller-ui/types';
import { TripPayload } from '@traveller-ui/views';

export interface TripUpdatePayload extends Base {
	payload: TripPayload;
}
