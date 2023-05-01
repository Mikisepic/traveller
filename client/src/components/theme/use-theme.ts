import React, { useEffect, useState } from 'react';

export const useTheme = (): [
	string,
	React.Dispatch<React.SetStateAction<string>>,
] => {
	const [theme, setTheme] = useState<string>(localStorage.theme);
	const colorTheme = theme === 'dark' ? 'light' : 'dark';

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);

		// save theme to local storage
		localStorage.setItem('theme', theme);
	}, [theme, colorTheme]);

	return [colorTheme, setTheme];
};
