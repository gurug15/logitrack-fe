
import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import api from '../../api/axios';



const CreateOrderForm = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const [products, setProducts] = useState([]); // fetched from backend
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({
    productName: '',
    quantity: '',
    price: ''
  });
  const [selectedProductId, setSelectedProductId] = useState('');
  const [orderedItems, setOrderedItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const resetForm = () => {
    setCustomerData({
      name: '',
      contact: '',
      email: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    });
    setOrderData({ productName: '', quantity: '', price: '' });
    setOrderedItems([]);
    setSelectedProductId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerData.name || !customerData.contact || !customerData.email || !customerData.address || !customerData.city || !customerData.state || !customerData.postalCode || orderedItems.length === 0) {
      alert('Please fill all required fields and add at least one product.');
      return;
    }
    setSubmitting(true);
    const payload = {
      customerName: customerData.name,
      contact: customerData.contact,
      email: customerData.email,
      address: customerData.address,
      city: customerData.city,
      state: customerData.state,
      postalCode: customerData.postalCode,
      country: customerData.country,
      items: orderedItems
    };
    console.log('Submitting order payload:', payload);
    try {
      const response = await api.post('/orders', payload);
      console.log('Order submission response:', response);
      resetForm();
      alert('Order submitted successfully!');
    } catch (err) {
      if (err.response) {
        console.error('Order submission error:', err.response.data);
        alert('Failed to submit order: ' + (err.response.data?.message || JSON.stringify(err.response.data)));
      } else {
        console.error('Order submission error:', err);
        alert('Failed to submit order.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    api.get('/items')
      .then(res => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      const prod = products.find(p => p.name === value);
      if (prod && prod.id) {
        setSelectedProductId(prod.id);
        // Clear price immediately for UI feedback
        setOrderData(prev => ({ ...prev, productName: value, quantity: orderData.quantity, price: '' }));
        api.get(`/items/${prod.id}`)
          .then(res => {
            setOrderData(prev => ({ ...prev, productName: value, quantity: orderData.quantity, price: res.data.price !== undefined && res.data.price !== null ? String(res.data.price) : '' }));
          })
          .catch(() => {
            setOrderData(prev => ({ ...prev, productName: value, quantity: orderData.quantity, price: '' }));
          });
      } else {
        setSelectedProductId('');
        setOrderData(prev => ({ ...prev, productName: value, price: '' }));
      }
    } else {
      setOrderData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = () => {
    const { productName, quantity, price } = orderData;
    if (!productName || !quantity || !price) return;
    const prod = products.find(p => p.name === productName);
    const id = prod ? prod.id : undefined;
    if (!id) return;
    const existing = orderedItems.find(item => item.productName === productName);
    if (existing) {
      setOrderedItems(orderedItems.map(item =>
        item.productName === productName
          ? { ...item, quantity: parseInt(item.quantity) + parseInt(quantity) }
          : item
      ));
    } else {
      setOrderedItems([...orderedItems, { id, productName, quantity: parseInt(quantity), price: parseFloat(price) }]);
    }
    setOrderData({ productName: '', quantity: '', price: '' });
  };

  const handleRemoveProduct = (name) => {
    setOrderedItems(orderedItems.filter(item => item.productName !== name));
  };

  const totalAmount = orderedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 p-4">
          <Link to="/dashboard" className="text-[#617189] text-base font-medium leading-normal">Dashboard</Link>
          <span className="text-[#617189] text-base font-medium leading-normal">/</span>
          <Link to="/dashboard/orders" className="text-[#617189] text-base font-medium leading-normal">Orders</Link>
          <span className="text-[#617189] text-base font-medium leading-normal">/</span>
          <span className="text-[#111418] text-base font-medium leading-normal">Create Order</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Create New Order</p>
        </div>

        {/* Customer Details Section */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Customer Details</h3>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Customer Name *</p>
            <input
              name="name"
              placeholder="Enter customer name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.name}
              onChange={handleCustomerChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Contact Number *</p>
            <input
              name="contact"
              placeholder="Enter contact number"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.contact}
              onChange={handleCustomerChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Customer Email *</p>
            <input
              name="email"
              placeholder="Enter customer email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.email}
              onChange={handleCustomerChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Full Delivery Address *</p>
            <textarea
              name="address"
              placeholder="Street address, building number"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] min-h-36 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.address}
              onChange={handleCustomerChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">City *</p>
            <input
              name="city"
              placeholder="Enter city"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.city}
              onChange={handleCustomerChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">State *</p>
            <input
              name="state"
              placeholder="Enter state"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.state}
              onChange={handleCustomerChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Postal Code *</p>
            <input
              name="postalCode"
              placeholder="Enter postal code"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.postalCode}
              onChange={handleCustomerChange}
            />
          </label>
        </div>

        {/* Order Details Section */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Order Details</h3>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Product Name *</p>
            <select
              name="productName"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 bg-[image:--select-button-svg] placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={orderData.productName}
              onChange={handleOrderChange}
              disabled={loading}
            >
              <option value="">Select product</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.name}>{prod.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Quantity *</p>
            <input
              name="quantity"
              placeholder="Enter quantity"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={orderData.quantity}
              onChange={handleOrderChange}
              type="number"
              min="1"
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Price *</p>
            <input
              name="price"
              placeholder="Product price"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal bg-gray-100"
              value={orderData.price}
              readOnly
              type="number"
            />
          </label>
        </div>
        <div className="flex px-4 py-3 justify-end">
          <Button variant="secondary" size="small" type="button" onClick={handleAddProduct} disabled={!orderData.productName || !orderData.quantity || !orderData.price}>
            Add Product
          </Button>
        </div>

        {/* Review & Submit Section */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Review & Submit</h3>
        <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">Order Summary Preview</p>
        {orderedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
            <p className="text-[#111418] text-base font-normal leading-normal flex-1 truncate">{item.productName}</p>
            <div className="shrink-0">
              <p className="text-[#111418] text-base font-normal leading-normal">Qty: {item.quantity}</p>
              <p className="text-[#111418] text-base font-normal leading-normal">₹{item.price}</p>
            </div>
            <Button variant="danger" size="small" type="button" onClick={() => handleRemoveProduct(item.productName)}>
              Remove
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
          <p className="text-[#111418] text-base font-normal leading-normal flex-1 truncate">Total</p>
          <div className="shrink-0">
            <p className="text-[#111418] text-base font-normal leading-normal">₹{totalAmount}</p>
          </div>
        </div>
        <div className="flex justify-stretch">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
            <Button variant="primary" size="small" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Order'}
            </Button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <div className="flex justify-stretch">
            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
              {/* Footer content here if needed */}
            </div>
          </div>
        </div>
      </footer>
    </form>
  );
};

export default CreateOrderForm;
