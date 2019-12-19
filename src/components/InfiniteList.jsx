import React from 'react';

export const InfiniteList = ({ items, renderItem, isLoading = true }) => {

    return (isLoading ? <div>Loading...</div> :
        <div>
            {items && items.map(item => renderItem(item))}
        </div>
    )

}