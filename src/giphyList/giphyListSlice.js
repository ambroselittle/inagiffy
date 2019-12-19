import { createSlice } from "@reduxjs/toolkit";
import { GiphyApi } from "../lib/GiphyApi";

const PAGE_SIZE = 25;

const giphies = createSlice({
    name: 'giphies',
    initialState: {
        criteria: {
            searchText: '',
            offset: 0,
        },
        totalItemCount: 0,
        items: [],
        detailGiphy: null,
        isLoading: false,
        loadFailed: false,
    },
    reducers: {
        search: (state, action) => {
            state.criteria.searchText = action.payload;
            state.criteria.offset = 0;
            state.isLoading = true;
        },
        clearSearch: (state, action) => {
            state.criteria.searchText = '';
            state.criteria.offset = 0;
            state.isLoading = true;
        },
        loadNextPage: (state, action) => {
            state.criteria.offset += PAGE_SIZE;
            state.isLoading = true;
        },
        showTrending: (state, action) => {
            state.criteria.offset = 0;
            state.isLoading = true;
        },
        giphiesLoaded: (state, action) => {
            state.loadFailed = false;
            state.isLoading = false;
            state.totalItemCount = action.payload.totalItemCount;
            state.items = action.payload.items;
        },
        giphiesLoadError: (state, action) => {
            state.loadFailed = true;
            state.isLoading = false;
            console.error('Problem loading giphies:', action.payload);
            state.items = [];
        },
        showDetail: (state, action) => {
            state.detailGiphy = action.payload;
        },
        hideDetail: (state, action) => {
            state.detailGiphy = null;
        },
    }
})

export const {
    search,
    clearSearch,
    showTrending,
    giphiesLoaded,
    giphiesLoadError,
    showDetail,
    hideDetail
} = giphies.actions;

export default giphies.reducer;

const api = new GiphyApi();

export const loadTrending = (offset = 0) => async dispatch => {
    try {
        const trendingResponse = await api.getTrending(offset, PAGE_SIZE);
        dispatch(giphiesLoaded({ totalItemCount: trendingResponse.pagination.total_count, items: trendingResponse.data }));
    } catch (ex) {
        dispatch(giphiesLoadError(ex.toString()));
    }
}

export const searchGiphy = (searchText, offset = 0) => async dispatch => {
    try {
        const searchResponse = await api.search(searchText, offset, PAGE_SIZE);
        dispatch(giphiesLoaded({ totalItemCount: searchResponse.pagination.total_count, items: searchResponse.data }));
    } catch (ex) {
        dispatch(giphiesLoadError(ex.toString()));
    }
}

