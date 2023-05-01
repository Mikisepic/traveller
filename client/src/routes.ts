import { Trip } from './pages/trip';
import { Map } from './pages/map';
import { Bookmark } from './pages/bookmark';
import { AppRoute } from './types';

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
		element: Trip,
	},
	{
		path: '/bookmarks',
		name: 'Bookmarks',
		element: Bookmark,
	},
];
