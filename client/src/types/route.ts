export interface AppRoute {
	path: string;
	name: string;
	element: React.ReactNode;
	search?: string;
	children?: AppRoute[];
}
