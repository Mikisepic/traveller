import { Place } from '@traveller-ui/features/map/types';
import { PaginatedList } from '@traveller-ui/types';

export interface BookmarkState {
	bookmarks: PaginatedList<Place>;
	loading: boolean;
	error: string | null;
}
