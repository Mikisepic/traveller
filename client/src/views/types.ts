import { Place } from '@traveller-ui/components/map';
import { Base } from '@traveller-ui/types';

export interface TripPayload {
	title: string;
	description: string;
	locations: Place[];
}

export interface Trip extends Base, TripPayload {}
