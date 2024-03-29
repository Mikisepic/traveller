import { Place } from '@traveller-ui/features/map/types';
import { Base, PaginatedList } from '@traveller-ui/types';

export interface Trip extends Base, TripPayload {
	shortened_url: string;
}

export interface TripPayload {
	title: string;
	description: string;
	locations: Place[];
	visible: boolean;
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
