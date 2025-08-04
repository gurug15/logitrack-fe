import React from 'react';
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import { CenterTable } from "../../components/admin/centermanagement/CenterTable";
import { PageHeader } from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import { useGetCenters } from '../../hooks/admin/useGetCenters';
import Pagination from '../../components/ui/Pagination';
import Button from '../../components/ui/Button';

const CenterManagement = () => {
    const navigate = useNavigate();

    // Use the custom hook to manage state and data fetching
    const {
        centers,
        isLoading,
        error,
        currentPage,
        totalPages,
        handleSearch,
        handlePageChange,
        totalCenters
    } = useGetCenters();

    const breadcrumbItems = [
        { label: 'Admin', link: '/admin' },
        { label: 'Centers' }
    ];

    const handleCenterClick = (center) => {
        console.log('Center clicked:', center);
        // Navigate to an edit/details page, e.g., navigate(`/admin/centers/${center.id}`);
    };

    const handleAddCenter = () => {
        navigate("/admin/centers/create");
    };

    // Loading State
    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
    }

    // Error State
    if (error) {
        return (
             <div className="p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Error fetching centers:</p>
                    <p>{error}</p>
                </div>
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            
            <PageHeader 
                title="Centers" 
                subtitle={`${totalCenters} centers found`}
                buttonText="Add Center"
                onButtonClick={handleAddCenter}
            />
            
            <div className="px-4 py-3">
                <SearchBar 
                    placeholder="Search by center name, city, or state..." 
                    onSearch={handleSearch}
                    btnTxt="Search"
                />
            </div>
            
            {centers.length > 0 ? (
                 <CenterTable
                    centers={centers}
                    onCenterClick={handleCenterClick}
                />
            ) : (
                <div className="text-center py-10 text-gray-500">
                    No centers found.
                </div>
            )}
           
            {totalPages > 1 && (
                <div className="flex justify-center p-4">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </>
    );
};

export default CenterManagement;