import React from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { Button } from '@traveller-ui/components/button';
import { useAppSelector } from '@traveller-ui/store';
import * as Yup from 'yup';

import { Error } from '@traveller-ui/components/error';
import { performRegister } from '../services';
import { selectAuthError } from '../store';

export const RegisterForm: React.FC = () => {
	const error = useAppSelector(selectAuthError);

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
		onSubmit: (values) => {
			performRegister(values);
			if (!error) navigate('/login');
		},
		validationSchema: Yup.object({
			email: Yup.string().trim().required('Email is required'),
			username: Yup.string().trim().required('Username is required'),
			password: Yup.string().trim().required('Password is required'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), undefined], 'Passwords must match')
				.required('Confirm Password is required'),
		}),
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="space-y-4">
				<div className="mb-6">
					<input
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
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
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
						type="text"
						placeholder="Username"
						name="username"
						value={formik.values.username}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.errors.username && <Error message={formik.errors.username} />}
				</div>

				<div className="mb-6">
					<input
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
						type="password"
						placeholder="Password"
						name="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.errors.password && <Error message={formik.errors.password} />}
				</div>

				<div className="mb-6">
					<input
						className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<div>
						{formik.errors.confirmPassword && (
							<Error message={formik.errors.confirmPassword} />
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-center items-center mt-6">
				<Button type="submit">Sign Up</Button>
			</div>
		</form>
	);
};
