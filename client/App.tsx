import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { useCachedResources, useColorScheme } from './hooks';
import Navigation from './navigation';
import { store } from './store';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Provider store={store}>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</Provider>
			</SafeAreaProvider>
		);
	}
}
