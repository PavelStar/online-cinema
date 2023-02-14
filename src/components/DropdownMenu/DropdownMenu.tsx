import React, {
    DetailedHTMLProps,
    forwardRef,
    HTMLAttributes,
    ReactNode,
} from 'react';
import styles from './DropdownMenu.module.scss';
import cn from 'classnames';

interface IDropdownMenu
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    appearance?: 'absolute';
    children?: ReactNode;
}

export const DropdownMenu = forwardRef<HTMLDivElement, IDropdownMenu>(
    ({ appearance = 'absolute', children, ...props }, ref) => {
        return (
            <div
                className={cn(styles['dropdown-menu'], styles[`${appearance}`])}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    },
);
