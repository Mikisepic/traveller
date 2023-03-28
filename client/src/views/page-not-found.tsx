import React from 'react';

export const PageNotFound: React.FC = () => {
	return (
		<>
			<h1 className="text-4xl mb-3 font-bold dark:text-white">
				404
				<small className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-400">
					This page does not exist
				</small>
			</h1>
		</>
	);
};
