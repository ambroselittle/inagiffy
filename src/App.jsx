import React from 'react';
import { Grid } from 'semantic-ui-react';

import './App.css';
import { GiphySearch } from "./giphyList/GiphySearch"
import { GiphyList } from "./giphyList/GiphyList";

const FULL_WIDTH_COLS = 16;

export const App = () => (
  <Grid className="app-container">
    <Grid.Column width={FULL_WIDTH_COLS} className="searchBar">
      <GiphySearch />
    </Grid.Column>
    <Grid.Column width={FULL_WIDTH_COLS} className="giphies">
      <GiphyList />
    </Grid.Column>
  </Grid>
);