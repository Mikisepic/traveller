import { PlacePayload } from '@traveller-ui/components/map';
import { Base } from '@traveller-ui/types';

export interface PlaceUpdatePayload extends Base {
	payload: PlacePayload;
}
