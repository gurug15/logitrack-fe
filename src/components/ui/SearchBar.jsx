import { useState } from 'react';
import Button from './Button';

const SearchBar = ({ placeholder = "Track your package", onSearch,btnTxt="Track" }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
      <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
        <div className="text-[#606e8a] flex border-none bg-[#f0f1f5] items-center justify-center pl-4 rounded-l-lg border-r-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
          </svg>
        </div>
        
        <input
          placeholder={placeholder}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-0 border-none bg-[#f0f1f5] focus:border-none h-full placeholder:text-[#606e8a] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <div className="flex items-center justify-center rounded-r-lg border-l-0 border-none bg-[#f0f1f5] pr-2">
          <Button size="medium" onClick={handleSearch}>
            {btnTxt}
          </Button>
        </div>
      </div>
    </label>
  );
};

export default SearchBar;