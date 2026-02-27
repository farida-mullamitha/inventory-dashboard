'use client';

import { useProducts } from '@/context/ProductContext';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { products, isLoaded } = useProducts();
  const router = useRouter();
  if (!isLoaded) {
    return (
      <div className="p-8 max-w-7xl mx-auto animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const totalProducts = products.length;

  const totalStock = products.reduce((acc, product) => acc + product.quantity, 0);

  const totalValue = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const outOfStock = products.filter(product => product.quantity === 0).length;

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-900 mt-2">Real-time insights into your inventory performance and stock health.</p>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Products" value={totalProducts} color="blue" />

          <DashboardCard title="Total Stock" value={totalStock.toLocaleString()} color="purple" />

          <DashboardCard title="Inventory Value" value={`₹${totalValue.toLocaleString('en-IN')}`} color="green" />

          <DashboardCard title="Out of Stock" value={outOfStock} color="red" />
        </div>
        <div className='mt-8 flex justify-center'>
          <button
            onClick={() => router.push('/products')}
            className="cursor-pointer inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-95 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-sm"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
}
