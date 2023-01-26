import React from 'react';
import _ from 'lodash';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import Pagination from 'react-bootstrap/Pagination';

const Pagination1 = (props) => {
    const {
        adsInSinglePage,
        adsLength,
        updateCurrentPage,
        setTwentyAds,
        currentPage,
        genderSearch,
        ageSearch,
        searchTitleSpecie,
        searchCity,
        searchPrice,
        searchBirdAge,
        pageX,
        setPageX
    } = props;
    const pages: number = Math.ceil(adsLength / adsInSinglePage);
    const range = _.range(1, pages + 1);

    return (
        <Pagination className="style-pagination-1">
            <Pagination.Prev
                onClick={async () => {
                    if (range.includes(currentPage - 1)) {
                        updateCurrentPage(currentPage - 1);
                    }
                }}
                className="page-item change-color"
            >
                Prev.
            </Pagination.Prev>

            <Pagination.Item
                onClick={async () => {
                    updateCurrentPage(currentPage + 1);
                }}
                className="page-item change-color"
            >
                {currentPage}
            </Pagination.Item>

            <Pagination.Next
                onClick={async () => {
                    if (range.includes(currentPage + 1)) {
                        updateCurrentPage(currentPage + 1);
                    }
                }}
                className="page-item change-color"
            >
                Next
            </Pagination.Next>
        </Pagination>
    );
};

export default Pagination1;
