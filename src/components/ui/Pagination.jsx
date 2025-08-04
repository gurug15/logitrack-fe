import React from 'react';

const DOTS = '...';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // --- This is the new, more advanced logic for generating page numbers ---
  const generatePageNumbers = () => {
    // 1. If total pages are 7 or less, show all pages without dots.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 2. If current page is near the start
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, DOTS, totalPages];
    }

    // 3. If current page is near the end
    if (currentPage >= totalPages - 3) {
      return [1, DOTS, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // 4. If current page is in the middle
    return [1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, totalPages];
  };

  const pages = generatePageNumbers();

  // Don't render if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center justify-center p-4">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="flex size-10 items-center justify-center rounded-full disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
          </button>
        </li>
        
        {/* Page Numbers */}
        {pages.map((page, index) => {
          const key = `page-${page}-${index}`; // More stable key

          if (page === DOTS) {
            return (
              <li key={key} className="flex size-10 items-center justify-center text-gray-500">
                <span>{DOTS}</span>
              </li>
            );
          }

          return (
            <li key={key}>
              <button
                onClick={() => onPageChange(page)}
                className={`text-sm flex size-10 items-center justify-center rounded-full transition-colors ${
                  page === currentPage ? 'bg-gray-200 font-bold text-gray-900' : 'font-normal text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="flex size-10 items-center justify-center rounded-full disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;