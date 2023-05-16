import { useNavigate } from 'react-router-dom';

import { Button } from '@traveller-ui/components/button';
import { useAppDispatch } from '@traveller-ui/store';

import { clearBookmarkState } from '@traveller-ui/features/bookmark/store';
import { clearPlaceState } from '@traveller-ui/features/map/store';
import { clearTripState } from '@traveller-ui/features/trip/store';

import { clearAuthState } from '../store';

export const ProfileDashboard = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(clearAuthState());
		dispatch(clearPlaceState());
		dispatch(clearBookmarkState());
		dispatch(clearTripState());
		navigate('/login');
	};

	return (
		<div className="w-full h-screen">
			<div className="w-full p-6">
				<Button theme="danger" onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</div>
	);
};
