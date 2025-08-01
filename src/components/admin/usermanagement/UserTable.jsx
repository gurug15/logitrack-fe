import { Link } from "react-router-dom";
import { DataTable } from "../../tabels/DataTable";
import { StatusBadge } from "../../ui/StatusBadge";

export const UserTable = ({ users, onUserClick }) => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      primary: true,
      width: 'w-[400px]'
    },
    {
      key: 'email',
      header: 'Email',
      width: 'w-[400px]'
    },
    {
      key: 'role',
      header: 'Role',
      width: 'w-60',
      render: (role) => <StatusBadge status={role} />
    },
    {
      key: 'center',
      header: 'Associated Logistics Center',
      width: 'w-[400px]'
    },
    {
      key: 'actions',
      header: 'Edit',
      width: 'w-60',
      render: (_,row) => (
        <span className="text-[#687282] text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer hover:text-[#1b5ff3]">
          <Link to={`/admin/user/${row.id}`}>Edit</Link>
        </span>
      )
    }
  ];

  return <DataTable columns={columns} data={users} onRowClick={onUserClick} />;
};