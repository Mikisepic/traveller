import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { t } from 'react-native-tailwindcss';
import { Counter } from '../components/features/counter/Counter';

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	return (
		<View style={styles.container}>
			<Text style={[t.textRed700, t.text6xl]}>Tab One</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="/screens/TabOneScreen.tsx" />
			<Counter />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
