import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    forwardRef,
} from 'react';
import styles from './Input.module.scss';

interface InputType
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    appearance?: 'default' | 'search';
    placeholder?: string;
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
                    className={styles[`${appearance}`]}
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
