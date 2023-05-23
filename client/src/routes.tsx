import { TripItem, TripList } from '@traveller-ui/features/trip/components';
import { Bookmark } from '@traveller-ui/pages/bookmark';
import { Login } from '@traveller-ui/pages/login';
import { Map } from '@traveller-ui/pages/map';
import { PageNotFound } from '@traveller-ui/pages/page-not-found';
import { Profile } from '@traveller-ui/pages/profile';
import { Register } from '@traveller-ui/pages/register';
import { Settings } from '@traveller-ui/pages/settings';
import { Trip } from '@traveller-ui/pages/trip';
import { AppRoute } from '@traveller-ui/types';

export const publicRoutes: AppRoute[] = [
	{
		path: '/',
		name: 'Map',
		element: <Map />,
		children: [
			{
				path: 'new',
				name: 'New one',
				element: <Profile />,
			},
		],
	},
];

export const protectedRoutes: AppRoute[] = [
	{
		path: '/trips',
		name: 'Trips',
		search: '?page=1',
		element: <Trip />,
		children: [
			{
				path: '',
				name: 'Trips',
				element: <TripList />,
			},
			{ path: 'new', name: 'New Trip', element: <TripItem /> },
			{
				path: ':id',
				name: 'Trip',
				element: <TripItem />,
			},
		],
	},
	{
		path: 'bookmarks',
		name: 'Bookmarks',
		element: <Bookmark />,
	},
	{
		path: 'profile',
		name: 'Profile',
		element: <Profile />,
	},
];

export const authRoutes: AppRoute[] = [
	{
		path: '/login',
		name: 'Login',
		element: <Login />,
	},
	{
		path: '/register',
		name: 'Register',
		element: <Register />,
	},
];

export const otherRoutes: AppRoute[] = [
	{
		path: '/settings',
		name: 'Settings',
		element: <Settings />,
	},
	{
		path: '*',
		name: 'Page Not Found',
		element: <PageNotFound />,
	},
];

export const allRoutes: AppRoute[] = publicRoutes.concat(
	protectedRoutes,
	authRoutes,
	otherRoutes,
);
