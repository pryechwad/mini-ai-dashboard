import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveMessage, listenToMessages } from "@/services/chatService";
import Header from "@/components/Header";
import PromptForm from "@/components/PromptForm";
import PromptList from "@/components/PromptList";
import WelcomeSlider from "@/components/WelcomeSlider";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    // Initialize with sample messages if none exist
    const initMessages = [
      { user: "Alice Johnson", message: "Hey team! How's the new AI model performing?", time: "10:30 AM", avatar: "👩‍💼" },
      { user: "Bob Smith", message: "Looking great! Success rate is up 15% this week.", time: "10:32 AM", avatar: "👨‍💻" },
      { user: "Carol Davis", message: "Awesome work everyone! 🚀", time: "10:35 AM", avatar: "👩‍🔬" }
    ];
    
    const unsubscribe = listenToMessages((data) => {
      if (data.length === 0) {
        // If no messages in Firebase, add sample messages
        initMessages.forEach(msg => saveMessage(msg));
      } else {
        setMessages(data);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const stats = [
    { 
      title: "Total Users", 
      value: "1,234", 
      change: "+12%", 
      trend: "up",
      color: "from-blue-500 to-cyan-600", 
      icon: "👥",
      bgPattern: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    { 
      title: "Subscribed", 
      value: "876", 
      change: "+8%", 
      trend: "up",
      color: "from-emerald-500 to-green-600", 
      icon: "✅",
      bgPattern: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
    },
    { 
      title: "API Calls Today", 
      value: "321", 
      change: "+15%", 
      trend: "up",
      color: "from-orange-500 to-red-500", 
      icon: "⚡",
      bgPattern: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    },
    { 
      title: "AI Prompts", 
      value: "2,847", 
      change: "+23%", 
      trend: "up",
      color: "from-violet-500 to-purple-600", 
      icon: "🤖",
      bgPattern: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20"
    }
  ];

  const quickActions = [
    { title: "Create Prompt", icon: "✍️", color: "from-indigo-500 to-purple-600", desc: "Generate new AI prompt", action: () => setActiveTab("prompts") },
    { title: "Analyze Data", icon: "📊", color: "from-green-500 to-emerald-600", desc: "View performance metrics", action: () => setActiveTab("analytics") },
    { title: "Team Chat", icon: "💬", color: "from-blue-500 to-cyan-600", desc: "Collaborate with team", action: () => setActiveTab("chat") },
    { title: "Settings", icon: "⚙️", color: "from-gray-500 to-slate-600", desc: "Configure preferences", action: () => alert("Settings panel coming soon! ⚙️") }
  ];

  const recentActivity = [
    { action: "New AI model deployed", time: "2 min ago", user: "System", type: "deploy", color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
    { action: "Prompt optimization completed", time: "15 min ago", user: "AI Assistant", type: "optimize", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
    { action: "New user registered", time: "1 hour ago", user: "Jane Smith", type: "user", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
    { action: "Performance report generated", time: "2 hours ago", user: "Analytics Bot", type: "report", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <Header />
      
      <main className="p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Welcome Slider */}
        <WelcomeSlider />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgPattern} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/20`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  <span>{stat.trend === 'up' ? '↗️' : '↘️'}</span>
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-3">⚡</span>
            Quick Actions
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
            <nav className="flex space-x-8 px-6">
              {["overview", "prompts", "activity", "chat", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-semibold text-sm capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  } rounded-t-lg`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 lg:p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Performance Chart Placeholder */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200/50 dark:border-blue-800/50">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                    <span className="mr-3">📈</span>
                    Performance Analytics
                  </h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4 animate-pulse">📊</div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">Interactive charts coming soon</p>
                      <div className="flex justify-center space-x-4 mt-4">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">AI Insight of the Day</h3>
                      <p className="text-emerald-100 mb-4">
                        Your prompt success rate has improved by 15% this week! The most effective prompts 
                        include specific context and clear instructions.
                      </p>
                      <button onClick={() => setActiveTab("analytics")} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all duration-300 active:scale-95">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "prompts" && (
              <div className="space-y-6">
                <PromptForm />
                <PromptList />
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-3">🔄</span>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:shadow-md transition-all duration-300">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.color}`}>
                        {activity.type === "deploy" ? "🚀" :
                         activity.type === "optimize" ? "⚡" :
                         activity.type === "user" ? "👤" : "📊"}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-3">💬</span>
                  Team Chat
                </h3>
                
                {/* Chat Messages */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 h-96 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {msg.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">{msg.user}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                          <p className="text-gray-800 dark:text-gray-200">{msg.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Chat Input */}
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={async (e) => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                        const newMsg = {
                          user: user?.email?.split('@')[0] || 'You',
                          message: newMessage.trim(),
                          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                          avatar: "👤"
                        };
                        await saveMessage(newMsg);
                        setNewMessage('');
                      }
                    }}
                  />
                  <button
                    onClick={async () => {
                      if (newMessage.trim()) {
                        const newMsg = {
                          user: user?.email?.split('@')[0] || 'You',
                          message: newMessage.trim(),
                          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                          avatar: "👤"
                        };
                        await saveMessage(newMsg);
                        setNewMessage('');
                      }
                    }}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🚀 Send
                  </button>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔬</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Detailed analytics and reporting features are coming soon!
                </p>
                <button onClick={() => alert("Thanks for your interest! We'll notify you when advanced analytics are available. 🚀")} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                  Request Early Access
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}