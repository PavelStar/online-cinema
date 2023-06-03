import React, {
    DetailedHTMLProps,
    forwardRef,
    HTMLAttributes,
    useRef,
    useState,
} from 'react';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import Arrow from '../../assets/arrow-stroked.svg';
import cn from 'classnames';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './Select.module.scss';

export interface IOption {
    id: number;
    value: string;
}

interface ISelect
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    appearance?: 'primary';
    selectTitle?: string;
    selectedOption: IOption;
    options: IOption[];
    onOptionChange?: (option: IOption) => void;
    wrapClassName?: string;
}

const Select = forwardRef<HTMLDivElement, ISelect>(
    (
        {
            appearance = 'primary',
            selectTitle,
            selectedOption,
            options,
            onOptionChange,
            wrapClassName,
            ...props
        },
        ref,
    ) => {
        const [isMenuShown, setIsMenuShown] = useState(false);

        const selectRef = useRef(null);
        useOutsideClick(selectRef, () => setIsMenuShown(false));

        const showMenu = (): void => {
            setIsMenuShown(!isMenuShown);
        };

        const changeOption = (option: IOption): void => {
            setIsMenuShown(false);
            if (onOptionChange) {
                onOptionChange(option);
            }
        };

        return (
            <div
                className={cn(styles['select-wrap'], wrapClassName)}
                {...props}
                ref={selectRef}
            >
                {selectTitle && <h3 className={styles.title}>{selectTitle}</h3>}
                <div
                    className={cn(styles['value-container'], {
                        [styles.opened]: isMenuShown,
                    })}
                    onClick={showMenu}
                >
                    <span>{selectedOption.value}</span>
                    <Arrow className={styles.arrow} />
                </div>
                {isMenuShown && (
                    <DropdownMenu className={styles['dropdown-menu']}>
                        <ul className={styles['options-list']}>
                            {options.map((option) => {
                                return (
                                    <li
                                        className={cn(styles.option, {
                                            [styles.active]:
                                                option.value ===
                                                selectedOption.value,
                                        })}
                                        key={option.id}
                                        onClick={() => changeOption(option)}
                                    >
                                        {option.value}
                                    </li>
                                );
                            })}
                        </ul>
                    </DropdownMenu>
                )}
            </div>
        );
    },
);

export default Select;
