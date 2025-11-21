import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mockWebSocketService } from '@/services/mockWebSocket';
import { updateToken, handlePriceUpdate, handleNewToken } from '@/store/slices/tokensSlice';
import { Token } from '@/types/token.types';

export const useWebSocket = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        mockWebSocketService.connect();

        const unsubscribe = mockWebSocketService.subscribe((message) => {
            if (message.type === 'PRICE_UPDATE') {
                dispatch(handlePriceUpdate(message.payload));
            } else if (message.type === 'NEW_TOKEN') {
                dispatch(handleNewToken(message.payload));
            }
        });

        return () => {
            unsubscribe();
            mockWebSocketService.disconnect();
        };
    }, [dispatch]);
};
