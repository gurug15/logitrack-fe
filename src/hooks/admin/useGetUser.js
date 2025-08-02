import { useState, useEffect } from 'react';
import api from '../../api/axios';

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Initialize as empty string
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const trimmedQuery = (searchQuery || '').trim();
      
      // Use template literals to construct URL
      let url = '/users';
      if (trimmedQuery !== '') {
        // Encode the search query to handle special characters
        const encodedQuery = encodeURIComponent(trimmedQuery);
        url = `/users?search=${encodedQuery}`;
      }
      
      console.log('Making request to:', url); // Debug log
      
      const response = await api.get(url, {
        timeout: 10000 // 10 second timeout
      });

      console.log('Response received:', response.data); // Debug log

      // Ensure response.data exists and is an array
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.warn('Unexpected response format:', response.data);
        setUsers([]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      console.error('Error response:', err.response?.data); // Additional debug info
      
      // More detailed error handling
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.message || err.response.data?.error || 'Unknown server error';
        setError(`Server Error: ${err.response.status} - ${errorMessage}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Network Error: No response from server');
      } else {
        // Something else happened
        setError(`Request Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Add debouncing to prevent too many API calls
    const debounceTimer = setTimeout(() => {
      fetchUsers();
      setCurrentPage(1);
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleSearchChange = (e) => {
    const value = e?.target?.value || e || ''; // Handle both event and direct value
    setSearchQuery(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  return {
    users: paginatedUsers,
    allUsers: users,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePageChange,
    refreshUsers,
    filteredUsersCount: users.length,
  };
};