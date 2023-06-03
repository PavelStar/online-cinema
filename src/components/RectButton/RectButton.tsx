import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    forwardRef,
} from 'react';
import styles from './RectButton.module.scss';
import cn from 'classnames';

interface IRectButton
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    appearance?: 'primary' | 'stroked' | 'stroked-small';
    fullWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const RectButton = forwardRef<HTMLButtonElement, IRectButton>(
    (
        {
            appearance = 'primary',
            fullWidth = false,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                type="button"
                className={cn(styles[`${appearance}`], className, {
                    [styles['full-width']]: fullWidth,
                })}
                {...props}
                ref={ref}
            >
                {children}
            </button>
        );
    },
);
