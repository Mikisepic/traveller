import { Base } from '@traveller-ui/types';

export interface Coordinates {
	lat: number;
	lng: number;
}

export interface Place extends Base, Coordinates, PlacePayload {}

export interface Viewport extends Coordinates {
	zoom: number;
}

export interface PlacePayload extends Coordinates {
	title: string;
	description: string;
	isBookmarked: boolean;
	priority: number;
}

export interface PlaceUpdatePayload extends Base {
	payload: PlacePayload;
}

export interface PlaceState {
	places: Place[];
	place: Place | null;
	loading: boolean;
	error: string | null;
}
