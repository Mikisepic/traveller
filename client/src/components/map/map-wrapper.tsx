import React, { useEffect, useState } from 'react';

import {
	BookmarkIcon,
	PlusIcon,
	BookmarkSlashIcon,
} from '@heroicons/react/24/outline';
import Map, { MapLayerMouseEvent, Marker, Popup } from 'react-map-gl';

import { PopupDialog } from './popup-dialog';
import { Pin, Place, Viewport } from './types';

interface Props {
	style: string;
}

export const MapWrapper: React.FC<Props> = ({ style }) => {
	// Map
	const [viewport, setViewport] = useState<Viewport>({
		lat: 54.69034904148157,
		lng: 25.27197473935047,
		zoom: 5,
	});
	const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);
	const [selectedStyle, setSelectedStyle] = useState<string>(style);

	// Markers
	const [pins, setPins] = useState<Pin[]>(() => {
		// Temporary solution until backend is stable
		const saved = localStorage.getItem('pins');
		const initialValue = JSON.parse(saved);
		return initialValue || [];
	});
	const [newPlace, setNewPlace] = useState<Place | null>(null);

	useEffect(() => {
		localStorage.setItem('pins', JSON.stringify(pins));
	}, [pins]);

	const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStyle = e.target.value;
		setSelectedStyle(newStyle);
	};

	const handleMarkerClick = (id: string, lat: number, lng: number) => {
		setCurrentPlaceId(id);
		setViewport({ ...viewport, lat, lng });
	};

	const handleAddClick = ({ lngLat }: MapLayerMouseEvent) => {
		const { lat, lng } = lngLat;

		setNewPlace({
			lat,
			lng,
		});
	};

	const handleBookmarking = (bookmarked: boolean) => {
		let index = pins.findIndex((pin) => pin.id === currentPlaceId);
		if (index === -1) return;

		setPins([
			...pins.slice(0, index),
			{ ...pins[index], isBookmarked: !bookmarked },
			...pins.slice(index + 1),
		]);
	};

	return (
		<>
			<div className="mb-5">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Map mode
				</label>
				<select
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					value={selectedStyle}
					onChange={handleStyleChange}
				>
					<option value="">--Please choose an option--</option>
					<option value="satellite-streets-v12">Satellite Streets</option>
					<option value="light-v11">Light</option>
					<option value="dark-v11">Dark</option>
					<option value="streets-v12">Streets</option>
					<option value="outdoors-v12">Outdoors</option>
				</select>
			</div>

			<Map
				mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
				initialViewState={{
					...viewport,
					latitude: viewport.lat,
					longitude: viewport.lng,
				}}
				doubleClickZoom={false}
				style={{ width: '100wv', height: '80vh' }}
				mapStyle={`mapbox://styles/mapbox/${selectedStyle}`}
				onDblClick={handleAddClick}
			>
				{pins.map((p) => (
					<div key={p.id}>
						<Marker
							latitude={p.lat}
							longitude={p.lng}
							onClick={() => handleMarkerClick(p.id, p.lat, p.lng)}
						></Marker>
						{p.id === currentPlaceId && (
							<Popup
								key={p.id}
								latitude={p.lat}
								longitude={p.lng}
								closeButton={true}
								closeOnClick={false}
								onClose={() => setCurrentPlaceId(null)}
								offset={[0, -40]}
								anchor="bottom"
							>
								<div className="max-w-sm p-3 bg-white dark:bg-gray-800">
									<div className="mb-5">
										<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
											Place
										</h5>
										<p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
											{p.title}
										</p>
										<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
											About
										</h5>
										<p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
											{p.description}
										</p>
									</div>

									<button
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
									>
										<PlusIcon className="h-6 w-6 text-white" />
									</button>

									<button
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
										onClick={() => handleBookmarking(p.isBookmarked)}
									>
										{p.isBookmarked ? (
											<BookmarkSlashIcon className="h-6 w-6 text-white" />
										) : (
											<BookmarkIcon className="h-6 w-6 text-white" />
										)}
									</button>
								</div>
							</Popup>
						)}
					</div>
				))}

				{newPlace && (
					<>
						<Marker latitude={newPlace.lat} longitude={newPlace.lng} />
						<Popup
							latitude={newPlace.lat}
							longitude={newPlace.lng}
							closeButton={true}
							closeOnClick={false}
							onClose={() => setNewPlace(null)}
							offset={[0, -40]}
							anchor="bottom"
						>
							<PopupDialog
								pins={pins}
								setPins={setPins}
								newPlace={newPlace}
								setNewPlace={setNewPlace}
							/>
						</Popup>
					</>
				)}
			</Map>
		</>
	);
};
