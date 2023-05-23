import React from 'react';

import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '@traveller-ui/components/button';
import { Error } from '@traveller-ui/components/error';
import { useAppSelector } from '@traveller-ui/store';

import { performLogin } from '../services';
import { selectAuthError } from '../store';

export const LoginForm: React.FC = () => {
	const error = useAppSelector(selectAuthError);

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			performLogin(values);
			if (!error) navigate('/profile');
		},
		validationSchema: Yup.object({
			email: Yup.string().trim().required('Email is required'),
			password: Yup.string().trim().required('Password is required'),
		}),
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="space-y-4">
				<div className="mb-6">
					<input
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						id="email"
						type="email"
						placeholder="Email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.errors.email && <Error message={formik.errors.email} />}
				</div>

				<div className="mb-6">
					<input
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						id="password"
						type="password"
						placeholder="Password"
						name="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.errors.password && <Error message={formik.errors.password} />}
				</div>
			</div>

			<div className="text-info text-center my-2" hidden={false}>
				Don't have an account yet?{' '}
				<Link to="/register">
					<span className="text-blue-600 dark:text-blue-500">Sign Up</span>
				</Link>
			</div>

			<div className="flex justify-center items-center mt-6">
				<Button type="submit">Login</Button>
			</div>
		</form>
	);
};
