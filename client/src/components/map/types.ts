export interface Coordinates {
	lat: number;
	lng: number;
}

export interface Pin extends Coordinates {
	id: string;
	title: string;
	description: string;
	isBookmarked: boolean;
}

export interface Viewport extends Coordinates {
	zoom: number;
}
