import cn from 'classnames';
import React, { FC, SyntheticEvent, useRef, useState } from 'react';
import styles from './UserNavigation.module.scss';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { RectButton } from '../RectButton/RectButton';
import { IconButton } from '../IconButton/IconButton';
import CrossIcon from '../../assets/cross-icon.svg';
import UserIcon from '../../assets/user-icon.svg';

document.addEventListener('keydown', (e) => {});

export const UserNavigation: FC = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isModalShown, setIsModalShown] = useState(false);

    const modalRef = useRef(null);

    const showModal = (e?: SyntheticEvent): void => {
        setIsModalShown(true);
    };

    const onOverlayClose = (e?: SyntheticEvent): void => {
        if (e?.target === modalRef.current) setIsModalShown(false);
    };

    const closeModal = (): void => {
        setIsModalShown(false);
    };

    return (
        <div className={cn(styles['user-navigation'])}>
            {isAuth ? (
                <p>User-nickname</p>
            ) : (
                <IconButton
                    className={styles['user-btn']}
                    icon={<UserIcon />}
                    appearance="user"
                    onClick={showModal}
                />
            )}
            {isModalShown ? (
                <Modal onOverlayClick={onOverlayClose} ref={modalRef}>
                    <>
                        <IconButton
                            className={cn(styles['cross-btn'])}
                            icon={<CrossIcon />}
                            onClick={closeModal}
                        />
                        <form className={styles.form}>
                            <div>
                                <h2 className={styles['modal-title']}>
                                    Создание нового пользователя
                                </h2>
                            </div>
                            <fieldset className={styles['fields-block']}>
                                <Input
                                    type="email"
                                    labelText="Почта"
                                    placeholder="ivanov@gmail.com"
                                    id="user-email-id"
                                />
                                <Input
                                    labelText="Имя пользователя"
                                    placeholder="Иван Иванов"
                                    id="user-name-id"
                                />
                                <Input
                                    type="password"
                                    labelText="Пароль"
                                    placeholder="Ivan12345"
                                    id="password-id"
                                />
                            </fieldset>
                            <div>
                                <RectButton onClick={() => console.log('sdsf')}>
                                    Создать пользователя
                                </RectButton>
                            </div>
                        </form>
                    </>
                </Modal>
            ) : null}
        </div>
    );
};
