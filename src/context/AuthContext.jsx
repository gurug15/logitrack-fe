import React, { createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios'; // Your configured Axios instance

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const  AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // On initial load, check for a token in localStorage
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                // Check if token is expired
                if (decodedUser.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decodedUser);
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (e) {
                console.error("Invalid token found, logging out.",e);
                logout();
            }
        }
        setIsLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const newToken = response.data;
            
            localStorage.setItem('token', newToken);
            setToken(newToken);
            
            const decodedUser = jwtDecode(newToken);
            setUser(decodedUser);

            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            if (decodedUser.role === 'admin') {
                navigate('/admin');
            } else if (decodedUser.role === 'sub_admin') { 
                navigate('/subadmin');
            } else { // This will handle the 'user' role
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Login failed:", error);
            // Re-throw the error so the login form can display it
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const authContextValue = {
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;