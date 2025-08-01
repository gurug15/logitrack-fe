export const DataTable = ({ columns, data, onRowClick, className = "" }) => {
  return (
    <div className={`px-4 py-3 @container ${className}`}>
      <div className="flex overflow-hidden rounded-xl border border-[#dde0e4] bg-white">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-[#121417] text-sm font-medium leading-normal ${column.width || 'w-[400px]'}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="border-t border-t-[#dde0e4] hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`h-[72px] px-4 py-2 text-sm font-normal leading-normal ${column.width || 'w-[400px]'} ${
                      column.primary ? 'text-[#121417]' : 'text-[#687282]'
                    }`}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
