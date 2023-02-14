import React, { FC, useRef, useState } from 'react';
import MenuIcon from '../../assets/menu-icon.svg';
import styles from './Menu.module.scss';
import { IconButton } from '../IconButton/IconButton';
import { Popup } from '../Popup/Popup';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { NavLink } from 'react-router-dom';

export const Menu: FC = (): JSX.Element => {
    const [isPopupShown, setIsPopupShown] = useState(false);
    const menuRef = useRef(null);

    const showMenuList = (): void => {
        setIsPopupShown(true);
    };

    useOutsideClick(menuRef, () => setIsPopupShown(false));

    const setActive = ({ isActive }: { isActive: boolean }): string =>
        isActive ? styles['active-link'] : undefined;

    return (
        <div className={styles.menu} onClick={showMenuList} ref={menuRef}>
            <IconButton icon={<MenuIcon />} />
            {isPopupShown && (
                <Popup>
                    <ul className={styles['menu-list']}>
                        <li>
                            <NavLink className={setActive} to="/">
                                Подборки
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={setActive} to="/film">
                                Новые фильмы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={setActive} to="/movies">
                                Лучшие фильмы
                            </NavLink>
                        </li>
                    </ul>
                </Popup>
            )}
        </div>
    );
};
