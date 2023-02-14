import React, { forwardRef } from 'react';
import styles from './Modal.module.scss';

interface IModalProps {
    onOverlayClick: () => void;
    children?: JSX.Element;
}

export const Modal = forwardRef<HTMLDivElement, IModalProps>(
    ({ onOverlayClick, children }, ref) => {
        return (
            <div className={styles.overlay} onClick={onOverlayClick} ref={ref}>
                <div className={styles.window}>{children}</div>
            </div>
        );
    },
);
