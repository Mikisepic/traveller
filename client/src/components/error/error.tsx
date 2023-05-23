import React from 'react';

interface Props {
	message: string;
}

export const Error: React.FC<Props> = ({ message }) => {
	return (
		<p className="mt-2 text-sm text-red-600 dark:text-red-500">{message}</p>
	);
};
