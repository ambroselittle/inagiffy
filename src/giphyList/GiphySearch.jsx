import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Icon } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

import "./GiphySearch.css";
import { search, clearSearch } from "./giphyListSlice";

export const GiphySearch = () => {
    const dispatch = useDispatch();
    const { searchText } = useSelector(state => state.giphies.criteria);
    const [searchBoxText, setSearchBoxText] = useState(searchText);
    // useState will immediately invoke if given a function, so we wrap it
    // we use useState here so the debounced func will be created 1x for the component
    const [debouncedSearch] = useState(() => debounce(newSearch => dispatch(search(newSearch)), 500));
    const searchBox = useRef(null);

    const onSearchChanged = (e, { value }) => {
        setSearchBoxText(value);
        debouncedSearch(value)
    }

    const resetSearch = () => {
        dispatch(clearSearch());
        setSearchBoxText('');
        if (searchBox.current) {
            searchBox.current.focus();
        }
    }

    return (
        <Input
            size="massive"
            placeholder="type to search giphies"
            icon={searchText !== '' ?
                <Icon name="x" className="link" onClick={resetSearch} />
                : <Icon name="search" />
            }
            className="search-box"
            value={searchBoxText}
            onChange={onSearchChanged}
            ref={searchBox}
            autoFocus
        />
    );
}
