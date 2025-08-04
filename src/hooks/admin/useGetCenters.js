import { useState, useEffect } from 'react';
import api from '../../api/axios';

export const useGetCenters = () => {
    const [centers, setCenters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const centersPerPage = 10;

    // Fetch all centers from API
    const fetchCenters = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/logistic-centers');
            setCenters(response.data);
        } catch (err) {
            console.error('Error fetching centers:', err);
            setError(err.response?.data?.message || 'Failed to fetch centers');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch centers on component mount
    useEffect(() => {
        fetchCenters();
    }, []);

    // Filter centers based on search query
    const filteredCenters = centers.filter(center =>
        center.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.state?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredCenters.length / centersPerPage);
    const startIndex = (currentPage - 1) * centersPerPage;
    const paginatedCenters = filteredCenters.slice(startIndex, startIndex + centersPerPage);

    // Handlers
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return {
        centers: paginatedCenters,
        isLoading,
        error,
        currentPage,
        totalPages,
        handleSearch,
        handlePageChange,
        totalCenters: filteredCenters.length
    };
};