import { useState, useEffect, useCallback } from 'react';
import api from '../../api/axios';  // adjust path as needed

// Main dashboard hook
export const useUserDashboardData = (userId) => {
  // --- State ---
  const [stats, setStats] = useState(null);             // for order statistics
  const [recentOrders, setRecentOrders] = useState([]); // for recent order list
  const [isLoading, setIsLoading] = useState(false);    // loading flag
  const [error, setError] = useState(null);             // error state

  // --- API Calls ---
  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get(`/orders/stats/${userId}`, { timeout: 10000 });
      setStats(data);
    } catch (err) {
      setError('Failed to fetch order statistics');
    }
  }, [userId]);

  const fetchRecentOrders = useCallback(async () => {
    try {
      const { data } = await api.get(`/orders/recent/${userId}`, { timeout: 10000 });
      setRecentOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch recent orders');
    }
  }, [userId]);

  // --- Effect ---
  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    Promise.all([fetchStats(), fetchRecentOrders()])
      .catch((err) => setError('Failed to load dashboard data'))
      .finally(() => setIsLoading(false));
  }, [userId, fetchStats, fetchRecentOrders]);

  // --- Manual refresh ---
  const refreshDashboardData = () => {
    setIsLoading(true);
    setError(null);
    Promise.all([fetchStats(), fetchRecentOrders()])
      .finally(() => setIsLoading(false));
  };

  return {
    stats,                 // order statistics
    recentOrders,          // recent order list
    isLoading,
    error,
    refreshDashboardData,  // manual refresh
  };
};

// Hook for order details page
export const useOrderDetails = (orderId) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/orders/view/${orderId}`, { timeout: 10000 });
      setOrderDetails(data);
      setItems(data?.orderItems || []); // Assuming API returns orderItems inside orderDetails
    } catch (err) {
      setError('Failed to fetch order details');
      setOrderDetails(null);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchDetails();
    }
  }, [orderId, fetchDetails]);

  return {
    orderDetails,
    items,
    isLoading,
    error,
    refresh: fetchDetails,
  };
};
