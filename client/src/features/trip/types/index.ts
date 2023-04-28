import { Place } from '@traveller-ui/features/map/types';
import { Base, PaginatedList } from '@traveller-ui/types';

export interface Trip extends Base, TripPayload {}

export interface TripPayload {
	title: string;
	description: string;
	locations: Place[];
}

export interface TripUpdatePayload extends Base {
	payload: TripPayload;
}

export interface TripState {
	trips: PaginatedList<Trip>;
	trip: Trip | null;
	loading: boolean;
	error: string | null;
}
