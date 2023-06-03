import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import Arrow from '../../assets/arrow-stroked.svg';
// import styles from '../../pages/Collections/Collections.module.scss';
import { IFilmFromTop, IFilteredFilmsResponse } from '../../types/types';
import styles from './Pagination.module.scss';
import cn from 'classnames';

interface IPagination {
    pagesCount: number;
    currentPage: number;
    onChange: (pageNum: number) => void;
    className?: string;
}

export const Pagination: FC<IPagination> = ({
    pagesCount,
    currentPage,
    onChange,
    className,
}): JSX.Element => {
    return (
        <>
            <ReactPaginate
                pageCount={pagesCount}
                previousLabel={<Arrow className={styles['arrow-prev']} />}
                nextLabel={<Arrow className={styles['arrow-next']} />}
                className={cn(styles.pagination, className)}
                activeClassName={styles['page-num-active']}
                previousLinkClassName={styles.prev}
                nextLinkClassName={styles.next}
                pageLinkClassName={styles['page-num-link']}
                onPageChange={({ selected }) => onChange(selected)}
                forcePage={currentPage}
            />
        </>
    );
};
