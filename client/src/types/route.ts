export interface AppRoute {
	path: string;
	name: string;
	element: React.FC;
	search?: string;
}
