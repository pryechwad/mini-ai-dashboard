import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserLogin } from "@/services/userTrackingService";
import ThemeToggle from "@/components/ThemeToggle";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Attempting login with:', email);
    try {
      const result = await login(email, password);
      console.log('Login successful:', result);
      // Update user login time
      updateUserLogin(result.user.uid);
      navigate("/dashboard");
    } catch (err) {
      console.error('Login error:', err);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        default:
          setError(`Login failed: ${err.message || 'Please try again'}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Theme Toggle */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Hero content */}
        <div className="flex lg:w-1/2 items-center justify-center p-4 sm:p-6 lg:p-12 order-2 lg:order-1">
          <div className="max-w-md text-center w-full">
            <div className="mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Mini AI Dashboard
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2">
                Unlock the power of artificial intelligence with our intuitive dashboard. 
                Manage prompts, analyze data, and streamline your AI workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="text-xl sm:text-2xl mb-2">🚀</div>
                <div className="font-semibold">Fast & Efficient</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="text-xl sm:text-2xl mb-2">🔒</div>
                <div className="font-semibold">Secure & Private</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="text-xl sm:text-2xl mb-2">📊</div>
                <div className="font-semibold">Analytics Ready</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="text-xl sm:text-2xl mb-2">⚡</div>
                <div className="font-semibold">Real-time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
          <div className="w-full max-w-md">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <Input 
                      placeholder="Enter your email" 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="h-10 sm:h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Password
                    </label>
                    <Input 
                      placeholder="Enter your password" 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                      className="h-10 sm:h-12"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-sm sm:text-base">
                  Sign In
                </Button>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                      Create one now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}