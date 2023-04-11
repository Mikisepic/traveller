import React from 'react';

import { Bookmark, Map, TripList } from './views';

export interface AppRoute {
	path: string;
	name: string;
	element: React.FC;
	search?: string;
}

export const routes: AppRoute[] = [
	{
		path: '/',
		name: 'Map',
		element: Map,
	},
	{
		path: '/trips',
		search: '?page=1',
		name: 'Trips',
		element: TripList,
	},
	{
		path: '/bookmarks',
		name: 'Bookmarks',
		element: Bookmark,
	},
];
