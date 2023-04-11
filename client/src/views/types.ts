import { Pin } from '../components/map';

export interface TripPayload {
	title: string;
	description: string;
	locations: Pin[];
}

export interface Trip extends TripPayload {
	id: string;
}
