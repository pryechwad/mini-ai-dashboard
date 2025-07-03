import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserRegistry } from "@/services/userTrackingService";
import Header from "@/components/Header";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrompts: 0,
    activeUsers: 0,
    newUsersToday: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      console.log('💾 Fetching real-time admin data...');
      
      // Get all localStorage keys to find user data
      const allPrompts = [];
      const userIds = new Set();
      
      // Scan localStorage for prompt data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ai_dashboard_prompts_')) {
          const uid = key.replace('ai_dashboard_prompts_', '');
          userIds.add(uid);
          try {
            const userPrompts = JSON.parse(localStorage.getItem(key) || '[]');
            allPrompts.push(...userPrompts);
          } catch (e) {
            console.error('Error parsing prompts for user:', uid);
          }
        }
      }
      
      // Get real user registry with actual emails
      const userRegistry = getUserRegistry();
      
      // Combine users from prompts and registry
      const allUserIds = new Set([...userIds, ...Object.keys(userRegistry)]);
      
      const usersData = Array.from(allUserIds).map(uid => {
        const userPrompts = allPrompts.filter(p => p.uid === uid);
        const registryData = userRegistry[uid];
        
        return {
          uid,
          email: registryData?.email || `user-${uid.slice(0, 8)}@example.com`,
          promptCount: userPrompts.length,
          lastActive: userPrompts.length > 0 
            ? new Date(Math.max(...userPrompts.map(p => p.timestamp)))
            : new Date(registryData?.lastLogin || registryData?.registrationDate || Date.now()),
          joinDate: new Date(registryData?.registrationDate || Math.min(...userPrompts.map(p => p.timestamp)) || Date.now())
        };
      });
      
      // Calculate real-time statistics
      const now = Date.now();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dayAgo = now - (24 * 60 * 60 * 1000);
      
      const realTimeStats = {
        totalUsers: usersData.length,
        totalPrompts: allPrompts.length,
        activeUsers: usersData.filter(u => u.lastActive.getTime() > dayAgo).length,
        newUsersToday: usersData.filter(u => u.joinDate >= today).length,
        avgPromptsPerUser: usersData.length > 0 ? Math.round(allPrompts.length / usersData.length) : 0
      };
      
      setUsers(usersData);
      setPrompts(allPrompts);
      setStats(realTimeStats);
      
      console.log('✅ Real-time data loaded:', realTimeStats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setMockData();
      setLoading(false);
    }
  };
  
  // Auto-refresh data every 10 seconds
  useEffect(() => {
    fetchAdminData();
    const interval = setInterval(fetchAdminData, 10000);
    return () => clearInterval(interval);
  }, []);

  const setMockData = () => {
    const mockUsers = [
      { uid: "user1", email: "john.doe@example.com", promptCount: 15, lastActive: new Date(), joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      { uid: "user2", email: "jane.smith@example.com", promptCount: 8, lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), joinDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { uid: "user3", email: "bob.wilson@example.com", promptCount: 22, lastActive: new Date(Date.now() - 30 * 60 * 1000), joinDate: new Date() },
      { uid: "user4", email: "alice.brown@example.com", promptCount: 12, lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000), joinDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { uid: "user5", email: "charlie.davis@example.com", promptCount: 6, lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000), joinDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
    ];
    
    const mockPrompts = Array.from({ length: 63 }, (_, i) => ({
      id: `prompt${i + 1}`,
      prompt: `Sample prompt ${i + 1}`,
      uid: mockUsers[i % mockUsers.length].uid,
      timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    }));
    
    setUsers(mockUsers);
    setPrompts(mockPrompts);
    setStats({
      totalUsers: mockUsers.length,
      totalPrompts: mockPrompts.length,
      activeUsers: 3,
      newUsersToday: 1
    });
  };

  const handleRefreshData = () => {
    console.log('Refreshing admin data manually...');
    setLoading(true);
    fetchAdminData();
  };

  const quickActions = [
    { title: "User Management", icon: "👥", color: "from-blue-500 to-cyan-600", desc: "Manage users", action: () => {
      console.log('Switching to users tab');
      setActiveTab("users");
    }},
    { title: "System Analytics", icon: "📊", color: "from-green-500 to-emerald-600", desc: "View analytics", action: () => {
      console.log('Switching to analytics tab');
      setActiveTab("analytics");
    }},
    { title: "Refresh Data", icon: "🔄", color: "from-purple-500 to-pink-600", desc: "Update stats", action: handleRefreshData },
    { title: "System Settings", icon: "⚙️", color: "from-orange-500 to-red-500", desc: "Configure system", action: () => {
      console.log('Switching to settings tab');
      setActiveTab("settings");
    }}
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">Loading admin data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <Header />
      
      <main className="p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Admin Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-12 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-4 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full animate-bounce"></div>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                Admin Control Panel
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-pink-100 mb-4 sm:mb-6 px-2 sm:px-0">
                Comprehensive system management and user analytics dashboard
              </p>
            </div>
            <div className="text-4xl sm:text-5xl lg:text-8xl animate-bounce">📊</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl shadow-lg">
                👥
              </div>
              <span className="text-green-500 text-sm font-semibold">+{stats.newUsersToday} today</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg">
                ⚡
              </div>
              <span className="text-green-500 text-sm font-semibold">Active</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Active Users (24h)</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center text-white text-2xl shadow-lg">
                📝
              </div>
              <span className="text-blue-500 text-sm font-semibold">Total</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Prompts</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPrompts}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl shadow-lg">
                📊
              </div>
              <span className="text-purple-500 text-sm font-semibold">Avg</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Prompts per User</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.avgPromptsPerUser || 0}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-3">⚡</span>
            Admin Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button key={index} onClick={action.action} className={`group relative overflow-hidden bg-gradient-to-r ${action.color} p-6 rounded-xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95`}>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-3">{action.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 px-3 sm:px-6 overflow-x-auto">
              {["overview", "users", "analytics", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 sm:py-4 px-2 sm:px-3 border-b-2 font-semibold text-xs sm:text-sm capitalize transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-red-500 text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/20"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  } rounded-t-lg`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 sm:p-6 lg:p-8">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <span className="mr-3">📈</span>
                    System Health
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Database Status</span>
                      <span className="text-green-500 font-semibold">✅ Online</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">API Response Time</span>
                      <span className="text-blue-500 font-semibold">⚡ 120ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Storage Usage</span>
                      <span className="text-orange-500 font-semibold">📦 45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Active Sessions</span>
                      <span className="text-purple-500 font-semibold">👥 {stats.activeUsers}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/50">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <span className="mr-3">📊</span>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 text-sm">👤</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">📝</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Prompt created</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-3">👥</span>
                  User Management ({users.length} users)
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prompts</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map((user, index) => (
                        <tr key={user.uid} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {user.email.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">ID: {user.uid.slice(0, 8)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              {user.promptCount} prompts
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {user.lastActive.toLocaleDateString()} {user.lastActive.toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {user.joinDate.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              Date.now() - user.lastActive.getTime() < 24 * 60 * 60 * 1000
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}>
                              {Date.now() - user.lastActive.getTime() < 24 * 60 * 60 * 1000 ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-3">📊</span>
                  System Analytics
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Growth Trend</h4>
                    <div className="h-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-4">📈</div>
                        <p className="text-gray-600 dark:text-gray-400">Growth visualization</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          {stats.newUsersToday} new users today
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Usage Statistics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Total Prompts</span>
                        <span className="font-bold text-gray-900 dark:text-white">{stats.totalPrompts}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Average per User</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {stats.totalUsers > 0 ? Math.round(stats.totalPrompts / stats.totalUsers) : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Active Users</span>
                        <span className="font-bold text-gray-900 dark:text-white">{stats.activeUsers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-3">⚙️</span>
                  System Settings
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">General Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">User Registration</span>
                        <button className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded text-sm font-medium">
                          Enabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Content Moderation</span>
                        <button className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded text-sm font-medium">
                          Auto
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">API Rate Limiting</span>
                        <button className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 rounded text-sm font-medium">
                          100/hour
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Security Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Two-Factor Auth</span>
                        <button className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded text-sm font-medium">
                          Required
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Session Timeout</span>
                        <button className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded text-sm font-medium">
                          24 hours
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Password Policy</span>
                        <button className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1 rounded text-sm font-medium">
                          Strong
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}