import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTokens, setLoading, setError, handlePriceUpdate, handleNewToken } from '@/store/slices/tokensSlice';
import { tokenService } from '@/services/tokenService';
import { mockWebSocketService } from '@/services/mockWebSocket';
import { TokenCategory } from '@/types/token.types';

export const useTokens = (category: TokenCategory) => {
    const dispatch = useDispatch();
    const { data: tokens, loading, error } = useSelector((state: RootState) => state.tokens);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['tokens', category],
        queryFn: () => tokenService.getTokens(category),
        staleTime: Infinity, // Initial fetch only, updates via WS
    });

    useEffect(() => {
        if (data) {
            dispatch(setTokens({ category, tokens: data }));
        }
    }, [data, category, dispatch]);

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    useEffect(() => {
        if (isError) {
            dispatch(setError('Failed to fetch tokens'));
        }
    }, [isError, dispatch]);

    // WebSocket Subscription
    useEffect(() => {
        mockWebSocketService.connect();

        const unsubscribe = mockWebSocketService.subscribe((message) => {
            if (message.type === 'PRICE_UPDATE') {
                dispatch(handlePriceUpdate(message.payload));
            } else if (message.type === 'NEW_TOKEN') {
                // Only add new tokens if we are viewing the 'new' category
                if (category === 'new') {
                    dispatch(handleNewToken(message.payload));
                }
            }
        });

        return () => {
            unsubscribe();
            // Don't disconnect here as other components might be using it
            // In a real app, we'd manage connection at a higher level or use a context
        };
    }, [dispatch, category]);

    return {
        tokens: tokens[category],
        loading,
        error,
    };
};
