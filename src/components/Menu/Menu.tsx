import React, { FC, useRef, useState } from 'react';
import MenuIcon from '../../assets/menu-icon.svg';
import styles from './Menu.module.scss';
import { IconButton } from '../IconButton/IconButton';
import { Popup } from '../Popup/Popup';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { NavLink } from 'react-router-dom';

export const Menu: FC = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const showMenuList = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    useOutsideClick(menuRef, () => setIsMenuOpen(false));

    const setActive = ({ isActive }: { isActive: boolean }): string =>
        isActive ? styles['active-link'] : undefined;

    return (
        <div className={styles.menu} ref={menuRef}>
            <IconButton icon={<MenuIcon />} onClick={showMenuList} />
            {isMenuOpen && (
                <Popup>
                    <ul className={styles['menu-list']}>
                        <li>
                            <NavLink
                                className={setActive}
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Домой
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={setActive}
                                to="/tops/top100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Подборки
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={setActive}
                                to="/movies"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Все фильмы
                            </NavLink>
                        </li>
                    </ul>
                </Popup>
            )}
        </div>
    );
};
