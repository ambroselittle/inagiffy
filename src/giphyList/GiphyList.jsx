import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Header } from "semantic-ui-react";

import "./GiphyList.css";
import { loadTrending, searchGiphy, loadNextPage } from "./giphyListSlice";
import { InfiniteList } from "components/InfiniteList";
import { Giphy } from './Giphy';
import { GiphyDetail } from './GiphyDetail';


export const GiphyList = () => {
    const dispatch = useDispatch();
    const { searchText, offset } = useSelector(state => state.giphies.criteria);
    const { items, isLoading, isLoadingNextPage, totalMatches } = useSelector(state => state.giphies);

    useEffect(() => {
        if (searchText === '') {
            dispatch(loadTrending(offset));
        } else {
            dispatch(searchGiphy(searchText, offset));
        }
    }, [searchText, offset, dispatch]);


    return (
        <>
            <InfiniteList
                isLoading={isLoading}
                isLoadingMore={isLoadingNextPage}
                loadingText="Finding your giphies..."
                renderItem={item => <Giphy key={item.id} data={item} />}
                items={items}
                onReachedBottom={() => dispatch(loadNextPage())}
            />
            {items.length > 0 && items.length >= totalMatches && <Header className="end-of-list">That's all folks!</Header>}
            <GiphyDetail />
        </>
    );
}


