import { createSlice } from "@reduxjs/toolkit";
import { GiphyApi } from "../lib/GiphyApi";

const PAGE_SIZE = 25;

const initialState = {
    criteria: {
        searchText: '',
        offset: 0,
    },
    totalMatches: 0,
    items: [],
    detailGiphy: null,
    isLoading: true,
    isLoadingNextPage: false,
    loadFailed: false,
};

const resetList = state => {
    state.criteria.offset = 0;
    state.items = [];
}

const giphies = createSlice({
    name: 'giphies',
    initialState,
    reducers: {
        search: (state, action) => {
            state.isLoading = true;
            state.criteria.searchText = action.payload;
            resetList(state);
        },
        clearSearch: (state, action) => {
            state.isLoading = true;
            state.criteria.searchText = '';
            resetList(state);
        },
        loadNextPage: (state, action) => {
            if (state.isLoading || state.isLoadingNextPage) {
                return; // we don't want to load more until current set is loaded
            }

            if (state.items.length >= state.totalMatches) {
                return; // we got all the ones we can get for current criteria
            }

            state.criteria.offset += PAGE_SIZE;
            state.isLoadingNextPage = true;
        },
        showTrending: (state, action) => {
            state.isLoading = true;
            state.criteria.searchText = '';
            resetList(state);
        },
        giphiesLoaded: (state, action) => {
            state.totalMatches = action.payload.totalMatches;
            state.items = state.items.concat(action.payload.items);
            state.loadFailed = false;
            state.isLoading = false;
            state.isLoadingNextPage = false;
        },
        giphiesLoadError: (state, action) => {
            state.items = [];
            state.loadFailed = true;
            state.isLoading = false;
            console.error('Problem loading giphies:', action.payload);
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
    loadNextPage,
    giphiesLoaded,
    giphiesLoadError,
    showDetail,
    hideDetail
} = giphies.actions;

export default giphies.reducer;

const api = new GiphyApi();

const mapResults = results => ({
    totalMatches: results.pagination.total_count,
    items: results.data
})

export const loadTrending = (offset = 0) => async dispatch => {
    try {
        const trendingResponse = await api.getTrending(offset, PAGE_SIZE);
        dispatch(giphiesLoaded(mapResults(trendingResponse)));
    } catch (ex) {
        dispatch(giphiesLoadError(ex.toString()));
    }
}

export const searchGiphy = (searchText, offset = 0) => async dispatch => {
    try {
        const searchResponse = await api.search(searchText, offset, PAGE_SIZE);
        dispatch(giphiesLoaded(mapResults(searchResponse)));
    } catch (ex) {
        dispatch(giphiesLoadError(ex.toString()));
    }
}

