const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Generate page numbers (simplified logic)
  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pages.push(i);
  }
  
  if (totalPages > 3) {
    pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center p-4">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="flex size-10 items-center justify-center"
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
        </svg>
      </button>
      
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : null}
          className={`text-sm font-${page === currentPage ? 'bold' : 'normal'} leading-normal flex size-10 items-center justify-center text-[#121417] rounded-full ${
            page === currentPage ? 'bg-[#f1f2f4]' : ''
          }`}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
      
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="flex size-10 items-center justify-center"
        disabled={currentPage === totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
        </svg>
      </button>
    </div>
  );
};


export default Pagination;