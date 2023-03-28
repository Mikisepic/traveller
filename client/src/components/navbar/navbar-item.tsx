import React from 'react';

import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../routes';

interface Props {
	route: AppRoute;
}

export const NavbarItem: React.FC<Props> = ({ route }) => {
	return (
		<li>
			<NavLink
				to={route.path}
				className={({ isActive }) =>
					[
						'block py-2 pl-3 pr-4 ',
						isActive
							? 'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
							: 'text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent',
					].join(' ')
				}
			>
				{route.name}
			</NavLink>
		</li>
	);
};
