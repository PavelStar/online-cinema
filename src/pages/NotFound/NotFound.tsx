import React from 'react';
import { Link } from 'react-router-dom';
import { RectButton } from '../../components/RectButton/RectButton';

export const NotFound = (): JSX.Element => {
    return (
        <>
            <h1>NotFound</h1>
            <Link to="/">
                <RectButton>Вернуться на главную</RectButton>
            </Link>
        </>
    );
};
