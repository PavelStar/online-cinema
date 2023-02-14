import { useEffect, useState } from 'react';

export const useDebounce = (initialValue: string, delay: number): string => {
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        const timer = setTimeout(() => setValue(initialValue), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [initialValue]);

    return value;
};
