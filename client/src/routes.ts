import React from 'react';

import { Bookmark, Map, Trip } from './views';

export interface AppRoute {
	path: string;
	name: string;
	element: React.FC;
}

export const routes: AppRoute[] = [
	{
		path: '/',
		name: 'Map',
		element: Map,
	},
	{
		path: '/trips',
		name: 'Trips',
		element: Trip,
	},
	{
		path: '/bookmarks',
		name: 'Bookmarks',
		element: Bookmark,
	},
];
