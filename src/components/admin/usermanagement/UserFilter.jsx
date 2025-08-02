import { FilterButton } from "../../ui/FilterButton";

export const UserFilters = ({ activeFilters, onFilterChange }) => {
  const filters = [
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    { key: 'center', label: 'Logistics Center' }
  ];

  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      {filters.map(filter => (
        <FilterButton
          key={filter.key}
          isActive={activeFilters.includes(filter.key)}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </FilterButton>
      ))}
    </div>
  );
};