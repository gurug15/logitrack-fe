
import { useState } from 'react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const CreateOrderForm = () => {
  
  const [customerData, setCustomerData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const [orderData, setOrderData] = useState({
    productName: '',
    quantity: '',
    price: '',
    specialInstructions: ''
  });

  const [products] = useState([
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 200 }
  ]);



  const handleCustomerChange = (field, value) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleOrderChange = (field, value) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="flex flex-1 justify-center py-5">
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
              placeholder="Enter customer name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.name}
              onChange={(e) => handleCustomerChange('name', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Contact Number *</p>
            <input
              placeholder="+91"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.contact}
              onChange={(e) => handleCustomerChange('contact', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Customer Email *</p>
            <input
              placeholder="Enter customer email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.email}
              onChange={(e) => handleCustomerChange('email', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Full Delivery Address *</p>
            <textarea
              placeholder="Street address, building number"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] min-h-36 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.address}
              onChange={(e) => handleCustomerChange('address', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">City *</p>
            <input
              placeholder="Enter city"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.city}
              onChange={(e) => handleCustomerChange('city', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">State *</p>
            <select
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 bg-[image:--select-button-svg] placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.state}
              onChange={(e) => handleCustomerChange('state', e.target.value)}
            >
              <option value="">Select state</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="karnataka">Karnataka</option>
            </select>
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Postal Code *</p>
            <input
              placeholder="Enter postal code"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.postalCode}
              onChange={(e) => handleCustomerChange('postalCode', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Country</p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={customerData.country}
              onChange={(e) => handleCustomerChange('country', e.target.value)}
            />
          </label>
        </div>

        {/* Order Details Section */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Order Details</h3>
        
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Product Name *</p>
            <input
              placeholder="Enter product name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={orderData.productName}
              onChange={(e) => handleOrderChange('productName', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Quantity *</p>
            <input
              placeholder="Enter quantity"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={orderData.quantity}
              onChange={(e) => handleOrderChange('quantity', e.target.value)}
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Price *</p>
            <input
              placeholder="Enter price"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] h-14 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={orderData.price}
              onChange={(e) => handleOrderChange('price', e.target.value)}
            />
          </label>
        </div>

        <div className="flex px-4 py-3 justify-end">
          <Button variant="secondary" size="small">
            Add Product
          </Button>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Special Instructions (optional)</p>
            <textarea
              placeholder="Enter any special instructions"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbdfe6] bg-white focus:border-[#dbdfe6] min-h-36 placeholder:text-[#617189] p-[15px] text-base font-normal leading-normal"
              value={orderData.specialInstructions}
              onChange={(e) => handleOrderChange('specialInstructions', e.target.value)}
            />
          </label>
        </div>

        {/* Review & Submit Section */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Review & Submit</h3>
        <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">Order Summary Preview</p>
        
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
            <p className="text-[#111418] text-base font-normal leading-normal flex-1 truncate">{product.name}</p>
            <div className="shrink-0">
              <p className="text-[#111418] text-base font-normal leading-normal">₹{product.price}</p>
            </div>
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
            <Button variant="primary" size="small">
              Submit Order
            </Button>
            <Button variant="secondary" size="small">
              Save as Draft
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <div className="flex justify-stretch">
            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
              <Button variant="secondary" size="small">
                Cancel
              </Button>
              <Button variant="primary" size="small">
                Submit Order
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateOrderForm;