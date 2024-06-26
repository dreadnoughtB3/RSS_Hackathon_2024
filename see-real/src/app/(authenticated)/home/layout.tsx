import React from 'react';
import { Home, Hash, Bell, MessageCircle, Bookmark, User } from 'lucide-react';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-200">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"><Home size={24} /></button>
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"><Hash size={24} /></button>
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"><Bell size={24} /></button>
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"><MessageCircle size={24} /></button>
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"><Bookmark size={24} /></button>
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"><User size={24} /></button>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}