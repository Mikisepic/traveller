export interface Coordinates {
	lat: number;
	lng: number;
}

export interface PlacePayload extends Coordinates {
	title: string;
	description: string;
	isBookmarked: boolean;
	priority: number;
}

export interface Place extends Coordinates, PlacePayload {
	id: string;
}

export interface Viewport extends Coordinates {
	zoom: number;
}
