import { combineReducers } from '@reduxjs/toolkit'
import giphiesReducer from "./giphyList/giphyListSlice";

const rootReducer = combineReducers({
    giphies: giphiesReducer,
})

export default rootReducer