import React from 'react';

interface Props {
	title: string;
	description: string;
}

export const Header: React.FC<Props> = ({ title, description }) => {
	return (
		<h1 className="text-4xl mb-5 font-bold dark:text-white">
			{title}
			<small className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-400">
				{description}
			</small>
		</h1>
	);
};
