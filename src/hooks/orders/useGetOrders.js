import { useState, useEffect } from 'react';
import api from '../../../api/axios';

export const useGetOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Fetch all orders from API
    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await api.get('/orders');
            console.log('Fetched orders:', response.data);
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.response?.data?.message || 'Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch orders when component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    // Filter orders based on search query
    const filteredOrders = orders.filter(order => 
        order.orderId?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

    // Search handler
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Page change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Refresh orders (useful for after creating/updating orders)
    const refreshOrders = () => {
        fetchOrders();
    };

    return {
        orders: paginatedOrders,
        allOrders: orders,
        isLoading,
        error,
        searchQuery,
        currentPage,
        totalPages,
        handleSearchChange,
        handlePageChange,
        refreshOrders,
        filteredOrdersCount: filteredOrders.length
    };
};


