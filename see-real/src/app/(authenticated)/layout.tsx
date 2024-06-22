import React from 'react';
import { MessageCircle, Users, Settings } from 'lucide-react';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-indigo-600 flex flex-col items-center py-4 space-y-6">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <MessageCircle size={24} className="text-indigo-600" />
        </div>
        <Users size={24} className="text-white hover:text-indigo-200 cursor-pointer" />
        <Settings size={24} className="text-white hover:text-indigo-200 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">SeeReal</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
