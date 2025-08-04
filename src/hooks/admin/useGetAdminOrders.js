import { useState, useEffect } from 'react';
import api from '../../api/axios';

export const useGetAdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Fetch all admin orders from API
    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/orders/admin');
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching admin orders:', err);
            setError(err.response?.data?.message || 'Failed to fetch admin orders');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch orders when component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    // **UPDATED**: Filter orders based on the new DTO fields
    const filteredOrders = orders.filter(order => 
        order.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customername?.toLowerCase().includes(searchQuery.toLowerCase()) || // Changed from customerName
        order.city?.toLowerCase().includes(searchQuery.toLowerCase()) // Changed from destinationCity
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

    // Search handler that accepts a query string directly
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // Page change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Refresh orders
    const refreshOrders = () => {
        fetchOrders();
    };

    return {
        orders: paginatedOrders,
        isLoading,
        error,
        searchQuery,
        currentPage,
        totalPages,
        handleSearch,
        handlePageChange,
        refreshOrders,
        filteredOrdersCount: filteredOrders.length
    };
};