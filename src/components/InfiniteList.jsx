import React, { useEffect } from 'react';
import { Header, Loader } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export const InfiniteList = ({ items, renderItem, onReachedBottom, isLoading = true, loadingText, isLoadingMore = false }) => {
    useEffect(() => {
        window.onscroll = debounce(() => {
            if ((window.innerHeight + document.documentElement.scrollTop) >= document.body.scrollHeight) {
                if (typeof onReachedBottom === 'function') {
                    onReachedBottom();
                }
            }
        }, 100);
    }, [onReachedBottom]);

    const loader = <Loader active inline='centered'>{loadingText}</Loader>;

    return (isLoading ? loader : (
        items && items.length > 0 ?
            <div>
                {items && items.map(item => renderItem(item))}
                {isLoadingMore && loader}
            </div>
            : <Header>No matching giphies. Try again!</Header>
    ));
}