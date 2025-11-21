import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterConfig } from '@/types/token.types';

const initialState: FilterConfig = {
    priceRange: { min: null, max: null },
    marketCapRange: { min: null, max: null },
    liquidityRange: { min: null, max: null },
    volumeRange: { min: null, max: null },
    top10HoldersMax: null,
    devHoldingMax: null,
    ageFilters: [],
    minHolders: null,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Partial<FilterConfig>>) => {
            return { ...state, ...action.payload };
        },
        resetFilters: () => initialState,
    },
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
