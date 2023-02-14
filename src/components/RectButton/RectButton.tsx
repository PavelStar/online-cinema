import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    forwardRef,
} from 'react';
import styles from './RectButton.module.scss';

interface IRectButton
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    appearance?: 'primary';
    children?: React.ReactNode;
}

export const RectButton = forwardRef<HTMLButtonElement, IRectButton>(
    ({ appearance = 'primary', children, ...props }, ref) => {
        return (
            <button
                type="button"
                className={styles[`${appearance}`]}
                {...props}
                ref={ref}
            >
                {children}
            </button>
        );
    },
);
