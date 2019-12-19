import React from 'react';
import { Modal, Image } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import "./GiphyDetail.css";
import { hideDetail } from "./giphyListSlice";

export const GiphyDetail = () => {
    const dispatch = useDispatch();
    const { detailGiphy } = useSelector(state => state.giphies);

    const hideModal = () => {
        dispatch(hideDetail());
    }

    return (
        <Modal
            open={!!detailGiphy}
            onClose={hideModal}
            className="giphy-detail"
            onClick={hideModal}
        >
            {detailGiphy &&
                <div className="giphy-detail-image-container">
                    <Image
                        src={detailGiphy.images.original.webp}
                    />
                </div>
            }
        </Modal>)
}