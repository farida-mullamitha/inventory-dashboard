"use client";

import { useProducts } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductTable() {
  const { products, deleteProduct } = useProducts();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (productId) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="w-full">
      {/* SEARCH + FILTER SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="w-full md:w-56 px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer appearance-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* TABLE SECTION */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No matching products found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600 font-mono">₹{Number(product.price).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-gray-600">{product.quantity}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          product.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => router.push(`/products/edit/${product.id}`)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleDelete(product.id)} 
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}