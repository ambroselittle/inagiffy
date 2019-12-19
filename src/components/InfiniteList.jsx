import React from 'react';
import { Loader } from 'semantic-ui-react';

export const InfiniteList = ({ items, renderItem, isLoading = true }) => {

    return (isLoading ? <Loader active inline='centered' /> :
        <div>
            {items && items.map(item => renderItem(item))}
        </div>
    )

}