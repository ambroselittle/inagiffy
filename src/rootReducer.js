import { combineReducers } from '@reduxjs/toolkit'
import giphiesReducer from "./giphySlice";

const rootReducer = combineReducers({
    giphies: giphiesReducer,
})

export default rootReducer