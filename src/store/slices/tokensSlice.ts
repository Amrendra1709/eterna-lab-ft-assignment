import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TokenCategory } from '@/types/token.types';

interface TokensState {
    data: Record<TokenCategory, Token[]>;
    loading: boolean;
    error: string | null;
}

const initialState: TokensState = {
    data: {
        new: [],
        final: [],
        migrated: [],
    },
    loading: false,
    error: null,
};

const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<{ category: TokenCategory; tokens: Token[] }>) => {
            state.data[action.payload.category] = action.payload.tokens;
        },
        updateToken: (state, action: PayloadAction<Token>) => {
            const category = action.payload.category;
            const index = state.data[category].findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.data[category][index] = action.payload;
            }
        },
        handlePriceUpdate: (state, action: PayloadAction<any[]>) => {
            action.payload.forEach((update) => {
                const category = update.category as TokenCategory;
                if (state.data[category]) {
                    const token = state.data[category].find((t) => t.id === update.id);
                    if (token) {
                        token.price = update.price;
                        token.priceChange24h = update.priceChange24h;
                        token.lastUpdated = new Date();
                    }
                }
            });
        },
        handleNewToken: (state, action: PayloadAction<Token>) => {
            // Check if token already exists to prevent duplicates
            const existingToken = state.data.new.find(t => t.id === action.payload.id);
            if (existingToken) {
                return; // Don't add duplicate
            }

            // Add to 'new' category
            state.data.new.unshift(action.payload);
            // Keep list size manageable
            if (state.data.new.length > 50) {
                state.data.new.pop();
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setTokens, updateToken, handlePriceUpdate, handleNewToken, setLoading, setError } = tokensSlice.actions;
export default tokensSlice.reducer;
