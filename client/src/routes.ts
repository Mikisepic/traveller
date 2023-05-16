import { Bookmark } from './pages/bookmark';
import { Login } from './pages/login';
import { Map } from './pages/map';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
import { Trip } from './pages/trip';
import { AppRoute } from './types';

export const publicRoutes: AppRoute[] = [
	{
		path: '/',
		name: 'Map',
		requiredLogin: false,
		element: Map,
	},
];

export const protectedRoutes: AppRoute[] = [
	{
		path: '/trips',
		search: '?page=1',
		name: 'Trips',
		requiredLogin: true,
		element: Trip,
	},
	{
		path: '/bookmarks',
		name: 'Bookmarks',
		requiredLogin: true,
		element: Bookmark,
	},
	{
		path: '/profile',
		name: 'Profile',
		requiredLogin: true,
		element: Profile,
	},
];

export const authRoutes: AppRoute[] = [
	{
		path: '/login',
		name: 'Login',
		requiredLogin: false,
		element: Login,
	},
	{
		path: '/register',
		name: 'Register',
		requiredLogin: false,
		element: Register,
	},
];

export const allRoutes: AppRoute[] = publicRoutes
	.concat(protectedRoutes)
	.concat(authRoutes);
