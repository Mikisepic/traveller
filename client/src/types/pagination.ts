export interface PaginatedList<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface CustomPaginatedList<T>
	extends Pick<PaginatedList<T>, 'count' | 'results'> {
	perPage: number;
	page: number;
	totalPages: number;
	previousPage: number;
	nextPage: number;
}
