"use client";

import { useProducts } from '@/context/ProductContext';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditProduct() {
  const { products, updateProduct } = useProducts();
  const router = useRouter();
  const { id } = useParams();

  const product = products.find(p => p.id === Number(id));

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    quantity: '',
    category: '',
    status: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
          <button 
            onClick={() => router.push('/products')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Return to list
          </button>
        </div>
      </div>
    );
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    updateProduct({
      ...formData,
      id: Number(id),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      status: Number(formData.quantity) > 0 ? 'Active' : 'Inactive',
    });

    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.push('/products')}
          className="flex items-center text-sm text-gray-900 hover:text-blue-600 transition-colors mb-6 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-sm text-gray-500">Update the information for {product.name}</p>
            </div>
            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {product.status}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name" 
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
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
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="0.00" 
                    className="block w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity</label>
                <input 
                  name="quantity" 
                  type="number" 
                  value={formData.quantity} 
                  onChange={handleChange} 
                  placeholder="0" 
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <input 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                placeholder="Category" 
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <button 
                type="button"
                onClick={() => router.push('/products')}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Discard Changes
              </button>
              <button 
                type="submit" 
                className="flex-[2] bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-100"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}