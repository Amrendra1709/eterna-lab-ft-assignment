import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortConfig } from '@/types/token.types';

const initialState: SortConfig = {
    column: null,
    direction: null,
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<SortConfig>) => {
            state.column = action.payload.column;
            state.direction = action.payload.direction;
        },
    },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
