export interface AppRoute {
	path: string;
	name: string;
	element: React.FC;
	requiredLogin: boolean;
	search?: string;
}
