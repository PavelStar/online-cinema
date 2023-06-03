import { configureStore } from '@reduxjs/toolkit';
import filterEntitiesReducer from './FilterEntitiesSlice';

export const store = configureStore({
    reducer: {
        filterEntitiesSlice: filterEntitiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
