export interface Place {
	lat: number;
	lng: number;
}

export interface Pin extends Place {
	id: string;
	title: string;
	description: string;
	isBookmarked: boolean;
}

export interface Viewport extends Place {
	zoom: number;
}
