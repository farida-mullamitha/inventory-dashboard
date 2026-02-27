"use client";

export default function DashboardCard({ title, value, color = "blue" }) {
  const colorStyles = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-100",
      icon: "text-blue-500",
    },
    green: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-100",
      icon: "text-emerald-500",
    },
    red: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-100",
      icon: "text-rose-500",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-100",
      icon: "text-purple-500",
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`bg-white p-6 rounded-2xl border ${style.border} shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
            {title}
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${style.text}`}>
            {value}
          </p>
        </div>
        
        <div className={`p-2 rounded-lg ${style.bg} ${style.icon}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
      
      <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full w-2/3 ${style.text.replace('text', 'bg')}`} />
      </div>
    </div>
  );
}