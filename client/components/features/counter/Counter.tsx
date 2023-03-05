import React, { useState } from 'react';

import {
	decrement,
	increment,
	incrementByAmount,
	incrementAsync,
	incrementIfOdd,
	selectCount,
} from './counterSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Button, Text, TextInput, View } from 'react-native';

export function Counter() {
	const count = useAppSelector(selectCount);
	const dispatch = useAppDispatch();
	const [incrementAmount, setIncrementAmount] = useState('2');

	const incrementValue = Number(incrementAmount) || 0;

	return (
		<View>
			<Button title="-" onPress={() => dispatch(decrement())} />
			<Text>{count}</Text>
			<Button title="+" onPress={() => dispatch(increment())} />
			<View>
				<TextInput
					value={incrementAmount}
					onChangeText={(text) => setIncrementAmount(text)}
				/>
				<Button
					title="Add Amount"
					onPress={() => dispatch(incrementByAmount(incrementValue))}
				/>
				<Button
					title="Add Async"
					onPress={() => dispatch(incrementAsync(incrementValue))}
				/>
				<Button
					title="Add If Odd"
					onPress={() => dispatch(incrementIfOdd(incrementValue))}
				/>
			</View>
		</View>
	);
}
