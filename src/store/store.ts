import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './slices/tokensSlice';
import filtersReducer from './slices/filtersSlice';
import sortReducer from './slices/sortSlice';

export const store = configureStore({
    reducer: {
        tokens: tokensReducer,
        filters: filtersReducer,
        sort: sortReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable for Date objects in Token
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
