import React, {
    DetailedHTMLProps,
    forwardRef,
    HTMLAttributes,
    ReactNode,
} from 'react';
import cn from 'classnames';
import styles from './Popup.module.scss';

interface IPopup
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    appearance?: 's' | 'user';
    className?: string;
    hasScroll?: boolean;
    children?: ReactNode;
}

export const Popup = forwardRef<HTMLDivElement, IPopup>(
    (
        {
            appearance = 'cross',
            className = '',
            hasScroll = false,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                className={cn(styles.popup, className, {
                    [styles.scroll]: hasScroll,
                })}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    },
);
