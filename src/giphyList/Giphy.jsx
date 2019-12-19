import React from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'semantic-ui-react';

import { showDetail } from "./giphyListSlice";

export const Giphy = ({ data }) => {
    const dispatch = useDispatch();

    const onSelect = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(showDetail(data));
    }

    return (
        <Image
            src={data.images.fixed_height_still.url}
            title={data.title}
            alt={data.title}
            as='a'
            href={`#${data.id}`}
            onClick={onSelect}
        />
    );
}
