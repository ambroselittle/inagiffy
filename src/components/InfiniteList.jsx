import React from 'react';
import { Header, Loader } from 'semantic-ui-react';

export const InfiniteList = ({ items, renderItem, isLoading = true, loadingText }) => {

    return (isLoading ? <Loader active inline='centered'>{loadingText}</Loader> : (
        items && items.length > 0 ?
            <div>
                {items && items.map(item => renderItem(item))}
            </div>
            : <Header>No matching giphies. Try again!</Header>
    ));
}