import {configureStore} from '@reduxjs/toolkit'
import betReducer from './betSlice.ts'

export default configureStore({
    reducer: {
        bet: betReducer
    }
});