import { useState, useEffect, useCallback } from 'react';
import api from '../../api/axios';

export const useGetIncomingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Call the new secure endpoint we just built
            const response = await api.get('/api/subadmin/orders');
            setOrders(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch incoming orders.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);
    
    // Filtering logic (e.g., by customer name or order ID)
    const filteredOrders = orders.filter(order =>
        order.customername?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(order.id)?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
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
        orders: paginatedOrders,
        isLoading,
        error,
        searchQuery,
        currentPage,
        totalPages,
        handleSearchChange,
        handlePageChange,
        totalOrders: filteredOrders.length,
        refetch: fetchOrders 
    };
};