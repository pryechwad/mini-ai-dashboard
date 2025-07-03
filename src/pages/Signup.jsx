import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/userTrackingService";
import ThemeToggle from "@/components/ThemeToggle";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await signup(email, password);
      // Track user registration with real email
      registerUser(result.user.uid, email);
      navigate("/dashboard");
    } catch (err) {
      console.error('Signup error:', err);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/email-already-in-use':
          setError('An account with this email already exists. Try logging in instead or use a different email.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password sign-up is disabled. Please contact support.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        default:
          setError(`Signup failed: ${err.message || 'Please try again'}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Signup form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 order-2 lg:order-1">
          <div className="w-full max-w-md">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
              <div className="text-center mb-8">

                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Join Mini AI Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Create your account and start your AI journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input 
                      placeholder="Enter your email" 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <Input 
                      placeholder="Create a strong password" 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Password should be at least 6 characters long
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold">
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Features content */}
        <div className="flex lg:w-1/2 items-center justify-center p-6 lg:p-12 order-1 lg:order-2">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Start Creating
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of users who are already leveraging AI to boost their productivity 
                and unlock new possibilities.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Free to Start</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time Updates</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Instant Setup</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get started in seconds</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Community Driven</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}