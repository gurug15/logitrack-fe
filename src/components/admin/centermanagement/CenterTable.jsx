import { DataTable } from "../../tabels/DataTable";

export const CenterTable = ({ centers, onCenterClick }) => {
    const columns = [
        { key: 'name', header: 'Name', primary: true, width: 'w-[250px]' },
        { key: 'city', header: 'City', width: 'w-[150px]' },
        { key: 'state', header: 'State', width: 'w-[150px]' },
        { key: 'address', header: 'Address', width: 'w-[350px]' },
        { key: 'contactPhone', header: 'Contact Phone', width: 'w-[200px]' } // Key updated
        // 'subadmins' column removed as data is not available from the API
    ];

    return <DataTable columns={columns} data={centers} onRowClick={onCenterClick} />;
};