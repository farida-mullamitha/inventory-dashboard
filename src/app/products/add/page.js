"use client";

import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Logic remains exactly as provided
    if (!formData.name.trim()) {
      return confirm('Product name is required');
    }
    if (Number(formData.price) <= 0) {
      return confirm('Price must be greater than 0');
    }
    if (Number(formData.quantity) < 0) {
      return confirm('Quantity cannot be negative');
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      category: formData.category,
      status: Number(formData.quantity) > 0 ? 'Active' : 'Inactive',
    };

    addProduct(newProduct);
    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Navigation */}
        <button 
          onClick={() => router.push('/products')}
          className="flex items-center text-sm text-gray-900 hover:text-indigo-600 transition-colors mb-6 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-sm text-gray-500">Enter the details to add a new item to your inventory.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name</label>
              <input 
                name="name" 
                placeholder="e.g. Wireless Mouse" 
                onChange={handleChange} 
                required 
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (₹)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                  <input 
                    name="price" 
                    type="number" 
                    placeholder="0.00" 
                    onChange={handleChange} 
                    required 
                    className="block w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock Quantity</label>
                <input 
                  name="quantity" 
                  type="number" 
                  placeholder="0" 
                  onChange={handleChange} 
                  required 
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                />
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <input 
                name="category" 
                placeholder="e.g. Electronics" 
                onChange={handleChange} 
                required 
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
              />
            </div>

            
            <div className="pt-4 flex gap-3">
              <button 
                type="button"
                onClick={() => router.push('/products')}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-[2] bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md shadow-indigo-100"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}