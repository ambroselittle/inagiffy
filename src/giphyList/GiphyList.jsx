import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { loadTrending, searchGiphy } from "./giphyListSlice";
import { InfiniteList } from "components/InfiniteList";

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
        <InfiniteList
            isLoading={isLoading}
            renderItem={item => (
                <img key={item.id} src={item.images.fixed_height_still.url} />
            )}
            items={items}
        />
    );
}


