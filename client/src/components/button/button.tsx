import React from 'react';

interface Props {
	type?: 'button' | 'submit';
	theme?: 'primary' | 'danger';
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<Props> = ({
	children,
	theme = 'primary',
	onClick,
	type = 'button',
}) => {
	return (
		<button
			type={type}
			className={
				theme === 'primary'
					? 'p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700  mr-4'
					: 'text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700'
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
