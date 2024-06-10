import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      onPageChange={handlePageChange}
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={
        'pagination flex justify-center items-center space-x-2'
      }
      previousLinkClassName={'btn btn-primary'}
      nextLinkClassName={'btn btn-primary'}
      disabledClassName={'btn-disabled'}
      activeClassName={'bg-blue-500 text-white rounded-full'}
      pageClassName={'btn btn-secondary'}
      pageLinkClassName={'btn btn-secondary'}
    />
  );
};

export default Pagination;
