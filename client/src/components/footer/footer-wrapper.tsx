import React from 'react';

import { Link } from 'react-router-dom';

export const FooterWrapper = () => {
	return (
		<footer className="bg-white  dark:bg-gray-900 mt-4">
			<div className="w-full container mx-auto p-4 md:px-0 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link to="/" className="flex items-center mb-4 sm:mb-0">
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Traveller
						</span>
					</Link>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
						<li>
							<Link to="/" className="mr-4 hover:underline md:mr-6 ">
								About
							</Link>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© {new Date().getFullYear()}{' '}
					<Link to="/" className="hover:underline">
						Traveller™
					</Link>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};
