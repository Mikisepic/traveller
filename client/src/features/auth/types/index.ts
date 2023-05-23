import { Place } from '@traveller-ui/features/map/types';
import { Notification } from '@traveller-ui/features/notification/types';
import { Trip } from '@traveller-ui/features/trip/types';

export interface AccountResponse extends TokenPayload {
	user: User;
}

export interface AuthState {
	loading: boolean;
	token: string | null;
	refreshToken: string | null;
	account: User | null;
	error: string | null;
	settings: UserSettings;
}

export interface TokenPayload {
	access: string;
	refresh: string;
}

export interface RegisterPayload {
	email: string;
	username: string;
	password: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface User {
	id: string;
	email: string;
	username: string;
	is_active: boolean;
	created: Date;
	updated: Date;
	places: Place[];
	trips: Trip[];
	notifications: Notification[];
}

export interface UserSettings {
	mapStyle: MapStyle;
}

export enum MapStyle {
	LightV11 = 'light-v11',
	DarkV11 = 'dark-v11',
	StreetsV12 = 'streets-v12',
	OutdoorsV12 = 'outdoors-v12',
	SatelliteStreetsV12 = 'satellite-streets-v12',
}
