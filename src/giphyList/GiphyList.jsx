import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { loadTrending, searchGiphy } from "./giphyListSlice";
import { InfiniteList } from "components/InfiniteList";
import { Giphy } from './Giphy';
import { GiphyDetail } from './GiphyDetail';


export const GiphyList = () => {
    const dispatch = useDispatch();
    const { searchText, offset } = useSelector(state => state.giphies.criteria);
    const { items, isLoading } = useSelector(state => state.giphies);

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
                renderItem={item => <Giphy key={item.id} data={item} />}
                items={items}
            />
            <GiphyDetail />
        </>
    );
}


