import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={
        'pagination flex justify-center items-center space-x-2'
      }
      previousLinkClassName={'btn btn-primary'}
      nextLinkClassName={'btn btn-primary'}
      disabledClassName={'btn-disabled'}
      activeClassName={'btn-active bg-green-500 text-white'}
      pageClassName={'btn btn-secondary'}
      pageLinkClassName={'btn btn-secondary'}
    />
  );
};

export default Pagination;
