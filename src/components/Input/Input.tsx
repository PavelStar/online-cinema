import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    forwardRef,
} from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

interface InputType
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    appearance?: 'default' | 'search';
    placeholder?: string;
    className?: string;
    value?: string;
    labelText?: string;
    id?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputType>(
    (
        {
            appearance = 'default',
            placeholder = '',
            className,
            value,
            labelText,
            id = undefined,
            onChange,
            ...props
        },
        ref,
    ) => {
        return (
            <div className={styles['input-wrap']}>
                {id != null && (
                    <label htmlFor={id} className={styles['input-label']}>
                        {labelText}
                    </label>
                )}
                <input
                    type="text"
                    className={cn(styles[`${appearance}`], className)}
                    placeholder={placeholder}
                    value={value}
                    id={id}
                    onChange={onChange}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    },
);
