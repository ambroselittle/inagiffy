import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import './App.css';
import { InfiniteList } from "./components/InfiniteList";
import { loadTrending, search, searchGiphy } from "./giphySlice";


function App() {
  const [searchBoxText, setSearchBoxText] = useState('');

  const dispatch = useDispatch();
  const { searchText, offset } = useSelector(state => state.giphies.criteria);
  const items = useSelector(state => state.giphies.items);
  const isLoading = useSelector(state => state.giphies.loading);

  useEffect(() => {
    if (searchText === '') {
      dispatch(loadTrending(offset));
    } else {
      dispatch(searchGiphy(searchText, offset));
    }
  }, [searchText, offset, dispatch]);

  return (
    <div className="App">
      <div className="searchBar">
        <input type="text" value={searchBoxText} onChange={(e) => setSearchBoxText(e.target.value)} /><button onClick={() => dispatch(search(searchBoxText))}>Search</button>
      </div>
      <InfiniteList
        items={items}
        isLoading={isLoading}
        renderItem={item => (
          <img key={item.id} src={item.images.fixed_height_still.url} />
        )}
      />
    </div>
  );
}

export default App;
