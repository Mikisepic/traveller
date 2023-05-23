import React from 'react';

import { Protected } from '@traveller-ui/features/auth/components';
import { BookmarkList } from '@traveller-ui/features/bookmark/components';
import { Header } from '@traveller-ui/layouts/header';

export const Bookmark: React.FC = () => {
	return (
		<Protected>
			<Header title="Bookmarks" description="Preview your saved destinations" />
			<BookmarkList />
		</Protected>
	);
};
