import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-lg sm:text-xl font-display font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate">
          <span className="hidden sm:inline">⚡ Mini AI Dashboard</span>
          <span className="sm:hidden">⚡ AI Dashboard</span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          
          {user?.email === "superadmin@test.com" && (
            <Link 
              to="/admin-panel" 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-xs sm:text-sm shadow-lg hover:shadow-xl"
            >
              <span className="hidden sm:inline">📊 Admin</span>
              <span className="sm:hidden">📊</span>
            </Link>
          )}
          
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden md:block max-w-32 truncate">
            {user?.email}
          </span>
          
          <button 
            onClick={logout}
            className="group relative flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline text-xs sm:text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
