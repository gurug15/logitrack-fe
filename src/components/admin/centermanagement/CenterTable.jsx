import { DataTable } from "../../tabels/DataTable";

export const CenterTable = ({ centers, onCenterClick }) => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      primary: true,
      width: 'w-[400px]'
    },
    {
      key: 'city',
      header: 'City',
      width: 'w-[400px]'
    },
    {
      key: 'state',
      header: 'State',
      width: 'w-[400px]'
    },
    {
      key: 'address',
      header: 'Address',
      width: 'w-[400px]'
    },
    {
      key: 'phone',
      header: 'Contact Phone',
      width: 'w-[400px]'
    },
    {
      key: 'subadmins',
      header: 'Assigned Subadmins',
      width: 'w-[400px]'
    }
  ];

  return <DataTable columns={columns} data={centers} onRowClick={onCenterClick} />;
};



