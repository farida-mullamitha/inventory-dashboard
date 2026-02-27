'use client';

import { useProducts } from '@/context/ProductContext';
import ProductTable from '@/components/products/ProductTable';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const { isLoaded } = useProducts();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-400 font-medium">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
      {/* Responsive for every device */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Products</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your inventory and product details.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-95 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-sm"
            >
              View Dashboard
            </button>
            <button
              onClick={() => router.push('/products/add')}
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-95 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  );
}
