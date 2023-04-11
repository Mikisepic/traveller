export interface Coordinates {
	lat: number;
	lng: number;
}

export interface PinPayload extends Coordinates {
	title: string;
	description: string;
	isBookmarked: boolean;
	priority: number;
}

export interface Pin extends Coordinates, PinPayload {
	id: string;
}

export interface Viewport extends Coordinates {
	zoom: number;
}
