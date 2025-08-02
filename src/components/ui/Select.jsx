export const Select = ({ label, name, value, onChange, options, error, disabled }) => {
  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div>
      <label
        className="text-[#121416] text-base font-medium leading-normal pb-2 block"
        htmlFor={selectId}
      >
        {label}
      </label>
      <select
        id={selectId}
        name={name} // Add this line
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border bg-white h-14 p-[15px] text-base font-normal leading-normal ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-[#dde0e3] focus:border-[#dde0e3]'
        } ${
          disabled
            ? 'bg-gray-100 cursor-not-allowed opacity-60'
            : 'bg-white'
        }`}
        style={{
          backgroundImage: "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(106,115,129)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 15px center',
          backgroundSize: '20px',
          paddingRight: '45px'
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};