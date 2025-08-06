import { useState, useEffect } from 'react';
import api from '../../api/axios'; // Adjust path as needed

export const useGetSubadminShipments = () => {
    const [shipments, setShipments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchShipments = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get('/shipments/my-center');
                setShipments(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch shipments.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchShipments();
    }, []);

    console.log(shipments)
    // Filter shipments by Tracking ID
    const filteredShipments = shipments.filter(shipment =>
        shipment.trackingId?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
    const paginatedShipments = filteredShipments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return {
        shipments: paginatedShipments,
        isLoading,
        error,
        searchQuery,
        currentPage,
        totalPages,
        handleSearchChange,
        handlePageChange,
        totalShipments: filteredShipments.length
    };
};