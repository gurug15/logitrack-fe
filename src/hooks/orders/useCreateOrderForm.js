import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // Ensure this path is correct

export const useCreateOrderForm = () => {
    const navigate = useNavigate();

    // State for customer information
    const [customerData, setCustomerData] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India' // Defaulting country
    });

    // State for products and loading/error status
    const [availableProducts, setAvailableProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState(null);

    // State for the product selection form
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    // State for the list of items added to the current order
    const [orderedItems, setOrderedItems] = useState([]);

    // Fetch products from the API on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const res = await api.get("/items"); // Your endpoint for fetching all items
                
                if (Array.isArray(res.data)) {
                    setAvailableProducts(res.data);
                } else {
                    setAvailableProducts([]);
                    console.error("API did not return an array of products:", res.data);
                    setError("Received invalid data from server.");
                }
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Could not load products. Please try refreshing the page.");
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    // Memoized calculation for the total amount
    const totalAmount = orderedItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.quantity) || 0;
        return sum + (price * qty);
    }, 0);

    // Handler for customer input changes
    const handleCustomerChange = (field, value) => {
        setCustomerData(prev => ({ ...prev, [field]: value }));
    };

    // Handler for adding a selected product to the order
    const handleAddProduct = () => {
        if (!selectedProduct) {
            alert("Please select a product.");
            return;
        }

        const productId = parseInt(selectedProduct);
        const currentQuantity = parseInt(quantity) || 0;
        
        const productToAdd = availableProducts.find(p => p.id === productId);

        // Robust validation before adding
        if (productToAdd && typeof productToAdd.price !== 'undefined' && currentQuantity > 0) {
            const existingItemIndex = orderedItems.findIndex(item => item.id === productId);

            if (existingItemIndex !== -1) {
                // If item exists, just update its quantity
                const updatedItems = [...orderedItems];
                updatedItems[existingItemIndex].quantity += currentQuantity;
                setOrderedItems(updatedItems);
            } else {
                // If it's a new product, add it to the list with the REAL price
                setOrderedItems(prev => [
                    ...prev,
                    {
                        id: productToAdd.id,
                        name: productToAdd.name,
                        price: productToAdd.price,
                        quantity: currentQuantity
                    }
                ]);
            }
            // Reset form for the next entry
            setSelectedProduct('');
            setQuantity(1);
        } else {
            console.error("Could not add product. Either product not found, price is missing, or quantity is invalid.", { productToAdd, currentQuantity });
            alert("Could not add the selected product. Please try again.");
        }
    };

    // Handler for removing an item from the order
    const handleRemoveProduct = (productId) => {
        setOrderedItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Handler for submitting the entire order
    const handleSubmitOrder = async () => {
        // Validation before submission
        if (orderedItems.length === 0) {
            alert("Cannot submit an empty order. Please add at least one product.");
            return;
        }
        if (!customerData.name || !customerData.contact || !customerData.address || !customerData.city || !customerData.state || !customerData.postalCode) {
            alert("Please fill in all required customer and address fields marked with *.");
            return;
        }

        // Create a payload that matches your backend DTO structure
        const orderPayload = {
            customerName: customerData.name,
            customerContact: customerData.contact,
            customerEmail: customerData.email,
            deliveryAddress: `${customerData.address}, ${customerData.city}, ${customerData.state} - ${customerData.postalCode}, ${customerData.country}`,
            totalAmount: totalAmount,
            orderItems: orderedItems.map(item => ({
                itemId: item.id,
                quantity: item.quantity,
                unitPrice: item.price
            }))
        };
        
        try {
            // Adjust the endpoint to your actual order creation endpoint
            await api.post("/orders", orderPayload); 
            alert("Order submitted successfully!");
            navigate('/dashboard/orders');
        } catch (err) {
            console.error("Failed to submit order:", err);
            const errorMessage = err.response?.data?.message || 'Please check the details and try again.';
            alert(`Failed to submit order. ${errorMessage}`);
        }
    };

    // Return all state and handlers for the UI component to consume
    return {
        customerData,
        availableProducts,
        loadingProducts,
        error,
        selectedProduct,
        quantity,
        orderedItems,
        totalAmount,
        handleCustomerChange,
        handleAddProduct,
        handleRemoveProduct,
        handleSubmitOrder,
        setSelectedProduct,
        setQuantity
    };
};