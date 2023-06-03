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
    appearance?: 'default';
    icon: ReactNode;
    text?: string;
    className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IIconButton>(
    ({ appearance = 'default', icon, text, className = '', ...props }, ref) => {
        return (
            <button
                type="button"
                className={cn(
                    styles['icon-button'],
                    styles[`${appearance}`],
                    { [styles['with-text']]: text },
                    className,
                )}
                {...props}
                ref={ref}
            >
                {icon}
                {text && <span>{text}</span>}
            </button>
        );
    },
);
