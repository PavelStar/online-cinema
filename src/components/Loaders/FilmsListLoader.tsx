import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const FilmsListLoader: FC = () => {
    return (
        <ContentLoader
            speed={2}
            width={800}
            height={1200}
            backgroundColor="#293167"
            foregroundColor="#7582d3"
        >
            <rect x="0" y="0" rx="3" ry="3" width="800" height="200" />
            <rect x="0" y="230" rx="3" ry="3" width="800" height="200" />
            <rect x="0" y="460" rx="3" ry="3" width="800" height="200" />
            <rect x="0" y="690" rx="3" ry="3" width="800" height="200" />
        </ContentLoader>
    );
};
