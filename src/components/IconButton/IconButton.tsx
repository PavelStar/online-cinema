import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    forwardRef,
    ReactNode,
} from 'react';
import cn from 'classnames';
import styles from './IconButton.module.scss';

interface IIconButton
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    appearance?: 'cross' | 'user';
    icon: ReactNode;
    className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IIconButton>(
    ({ appearance = 'cross', icon, className = '', ...props }, ref) => {
        return (
            <button
                type="button"
                className={cn(
                    styles['icon-button'],
                    styles[`${appearance}`],
                    className,
                )}
                {...props}
                ref={ref}
            >
                {icon}
            </button>
        );
    },
);
