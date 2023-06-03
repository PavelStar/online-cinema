import React, { FC } from 'react';
import { ICountry, IGenre, IPerson } from '../../types/types';
import styles from './HorizontalList.module.scss';
import cn from 'classnames';

type ItemType = ICountry | IGenre | IPerson;

interface IHorizontalList {
    data: ItemType[];
    isStaff?: boolean;
    staffProfession?: 'Режиссеры' | 'Актеры';
    className?: string;
}

export const HorizontalList: FC<IHorizontalList> = ({
    data,
    isStaff = false,
    staffProfession = 'Режиссеры',
    className,
}): JSX.Element => {
    return (
        <div>
            <p className={cn(styles.list, className)}>
                {isStaff
                    ? (data as IPerson[])
                          .filter(({ professionText }) => {
                              return professionText === staffProfession;
                          })
                          .map(({ nameRu }, index, arr) => {
                              return (
                                  <span key={index}>
                                      {nameRu}
                                      {index === arr.length - 1 ? '' : ', '}
                                  </span>
                              );
                          })
                    : data.map((item, index, arr) => {
                          return (
                              <span key={index}>
                                  {'country' in item && item.country}
                                  {'genre' in item && item.genre}
                                  {index === arr.length - 1 ? '' : ', '}
                              </span>
                          );
                      })}
            </p>
        </div>
    );
};
