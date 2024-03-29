import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';

import { Button } from '@traveller-ui/components/button';
import { Install } from '@traveller-ui/components/install-pwa';
import { NotificationWrapper } from '@traveller-ui/features/notification/components';
import { authRoutes } from '@traveller-ui/routes';
import { AppRoute } from '@traveller-ui/types';

import { NavbarItem } from './navbar-item';

interface Props {
	routes: AppRoute[];
	isAuthenticated: boolean;
}

export const NavbarWrapper: React.FC<Props> = ({ routes, isAuthenticated }) => {
	const [collapse, setCollapse] = useState(false);

	const handleCollapse = () => setCollapse(!collapse);

	const routeItems = routes.map((route, key) => (
		<NavbarItem key={key} route={route} />
	));

	return (
		<nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<Link to="/" className="flex items-center">
					<span className="self-center text-5xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
						Traveller
					</span>
				</Link>

				<div className="flex items-center justify-between">
					<Install />
					<Link to="/settings">
						<Button>
							<Cog6ToothIcon className="w-6 h-6 text-white" />
						</Button>
					</Link>
					{isAuthenticated && <NotificationWrapper />}

					<button
						type="button"
						className="inline-flex items-center p-2 mx-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						onClick={handleCollapse}
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>

					<div className="hidden w-full ml-3 md:flex items-center justify-between md:w-auto">
						<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							{routeItems}
							{!isAuthenticated && <NavbarItem route={authRoutes[0]} />}
						</ul>
					</div>
				</div>
				{collapse && (
					<div className="block w-full md:hidden">
						<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							{routeItems}
							{!isAuthenticated && <NavbarItem route={authRoutes[0]} />}
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};
