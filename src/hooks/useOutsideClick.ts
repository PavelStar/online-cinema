import { RefObject, useEffect } from 'react';

export const useOutsideClick = (
    ref: RefObject<Node>,
    callback: () => void,
): void => {
    const handler = (e: MouseEvent): void => {
        if (ref.current !== null && !ref.current.contains(e.target as Node)) {
            console.log('callback');
            callback();
        }
    };
    useEffect(() => {
        if (ref.current != null) document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    });
};
