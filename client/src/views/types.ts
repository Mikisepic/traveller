import { Place } from '@traveller-ui/components/map';

export interface TripPayload {
	title: string;
	description: string;
	locations: Place[];
}

export interface Trip extends TripPayload {
	id: string;
}
