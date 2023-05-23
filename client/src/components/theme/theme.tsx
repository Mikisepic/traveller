import React, { useState } from 'react';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { setMapStyle } from '@traveller-ui/features/auth/store';
import { MapStyle } from '@traveller-ui/features/auth/types';
import { useAppDispatch } from '@traveller-ui/store';

import { Button } from '../button';
import { useTheme } from './use-theme';

export const Theme: React.FC = () => {
	const dispatch = useAppDispatch();

	const [colorTheme, setTheme] = useTheme();
	const [darkSide, setDarkSide] = useState(
		colorTheme === 'light' ? true : false,
	);

	const toggleTheme = (checked: boolean) => {
		setTheme(colorTheme);
		setDarkSide(checked);
		dispatch(setMapStyle(checked ? MapStyle.DarkV11 : MapStyle.LightV11));
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
