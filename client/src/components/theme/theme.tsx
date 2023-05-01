import React, { useState } from 'react';

import { Button } from '../button';
import { useTheme } from './use-theme';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export const Theme: React.FC = () => {
	const [colorTheme, setTheme] = useTheme();
	const [darkSide, setDarkSide] = useState(
		colorTheme === 'light' ? true : false,
	);

	const toggleTheme = (checked: boolean) => {
		setTheme(colorTheme);
		setDarkSide(checked);
	};

	return (
		<Button onClick={() => toggleTheme(!darkSide)}>
			{darkSide ? (
				<MoonIcon className="h-6 w-6 text-white" />
			) : (
				<SunIcon className="h-6 w-6 text-white" />
			)}
		</Button>
	);
};
