import React from 'react';
import { Button } from 'react-bulma-components';
import { useAppDispatch } from '../../redux/hooks';
import { fetchOrdersAsync } from '../../redux/orders.slice';
import {
    receive,
} from '../../redux/categories.slice';

export default function Testpage() {
    const dispatch = useAppDispatch();
    return (
        <>
            <Button
                aria-label="Decrement value"
                onClick={() => dispatch(receive('ddd'))}
            >
                testa
            </Button>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(fetchOrdersAsync())}
            > 
                    cats async
            </button>
        </>
    );    
}