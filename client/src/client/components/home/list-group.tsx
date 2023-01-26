import ListGroup from 'react-bootstrap/ListGroup';
import * as React from 'react';

function List1({
    value,
    setValue,
    setGenderSearch,
    setAgeSearch,
    setSearchTitleSpecie,
    setSearchCity,
    setSearchType,
    setPriceTo,
    setPriceFrom,
    setSearchBirdAge,
    updateCurrentPage
}) {
    return (
        <ListGroup className="list-group">
            <ListGroup.Item
                className={value === 'birds' ? 'bg-x text-white' : ''}
                onClick={() => {
                    setValue('birds');
                    setAgeSearch('');
                    setGenderSearch('');
                    setSearchTitleSpecie('');
                    setSearchCity('');
                    setSearchType('');
                    setPriceTo(''), setPriceFrom(''), setSearchBirdAge('');
                    updateCurrentPage(1);
                }}
            >
                Birds
            </ListGroup.Item>
            <ListGroup.Item
                className={value === 'foods' ? 'bg-x text-white' : ''}
                onClick={() => {
                    setValue('foods');
                    setAgeSearch('');
                    setGenderSearch('');
                    setSearchTitleSpecie('');
                    setSearchCity('');
                    setSearchType('');
                    // setSearchPrice(0);
                    setPriceFrom(''), setPriceTo(''), setSearchBirdAge('');
                    updateCurrentPage(1);
                }}
            >
                Foods & Accessories
            </ListGroup.Item>
        </ListGroup>
    );
}

export default List1;
