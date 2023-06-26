import { Base } from '@traveller-ui/types';

export interface Coordinates {
	lat: number;
	lng: number;
}

export interface Place extends Base, Coordinates, PlacePayload {}

export interface Viewport extends Coordinates {
	zoom: number;
}

export interface PlacePayload extends Coordinates {
	title: string;
	description: string;
	isBookmarked: boolean;
	priority: number;
}

export interface PlaceUpdatePayload extends Base {
	payload: PlacePayload;
}

export interface PlaceState {
	places: Place[];
	place: Place | null;
	waypoints: MapboxOptimizationWaypoint[] | MapboxWaypoint[] | null;
	optimizations: MapboxOptimizationTrip[] | null;
	routes: MapboxRoute[] | null;
	loading: boolean;
	error: string | null;
}

export interface MapboxDirectionsResponse {
	routes: MapboxRoute[];
	waypoints: MapboxWaypoint[];
	code: string;
	uuid: string;
}

export interface MapboxOptimizationResponse {
	code: string;
	waypoints: MapboxOptimizationWaypoint[];
	trips: MapboxOptimizationTrip[];
}

export interface MapboxRouteBase {
	weight: number;
	weight_typical: number;
	duration: number;
	duration_typical: number;
	distance: number;
}

export interface MapboxRoute extends MapboxRouteBase {
	weight_name: string;
	voiceLocale: string;
	legs: MapboxRouteLeg[];
	geometry: GeoJSON.Geometry;
}

export interface MapboxRouteLeg extends MapboxRouteBase {
	summary: string;
	steps: MapboxRouteLegStep[];
}

export interface MapboxRouteLegStep extends MapboxRouteBase {
	maneuver: MapboxRouteLegStepManeuver;
	geometry: GeoJSON.Geometry;
	name: string;
	ref: string;
	destinations: string;
	exits: string;
	driving_side: string;
	pronunciation: string;
	speedLimitSign: string;
	speedLimitUnit: string;
}

export interface MapboxRouteLegStepManeuver {
	bearing_before: number;
	bearing_after: number;
	instruction: string;
	location: number[];
	modifier: string;
	type: string;
}

export interface MapboxWaypoint {
	distance: number;
	name: string;
	location: number[]; // [longitude, latitude]
}

export interface MapboxOptimizationWaypoint extends MapboxWaypoint {
	waypoint_index: number;
	trips_index: number;
}

export interface MapboxOptimizationTrip
	extends Pick<MapboxRouteBase, 'distance' | 'weight' | 'duration'> {
	geometry: GeoJSON.Geometry;
	weight_name: string;
	legs: MapboxRouteLeg[];
}

export const markerColors = [
	'#3FB1CE',
	'#B3001B',
	'#262626',
	'#255C99',
	'#7EA3CC',
	'#CCAD8F',
	'#99008c',
	'#08c355',
	'#e39010',
	'#40e0d0',
	'#ffcc00',
	'#82c49e',
];
