import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { listenToPrompts } from "@/services/firestoreService";
import { getPromptsLocal } from "@/services/localStorageService";

export default function PromptList() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    console.log('👥 Setting up prompts for user:', user.uid);
    
    // Use localStorage directly for reliable data persistence
    const loadLocalPrompts = () => {
      try {
        const localPrompts = getPromptsLocal(user.uid);
        console.log('💾 Loaded prompts from localStorage:', localPrompts.length, 'prompts');
        console.log('Prompts data:', localPrompts);
        setPrompts(localPrompts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading local prompts:', error);
        setLoading(false);
      }
    };
    
    // Load prompts immediately
    loadLocalPrompts();
    
    // Listen for custom events from PromptForm
    const handlePromptSaved = () => {
      console.log('🔄 Refreshing prompts list after save...');
      setTimeout(loadLocalPrompts, 100); // Small delay to ensure localStorage is updated
    };
    
    window.addEventListener('promptSaved', handlePromptSaved);
    
    return () => {
      console.log('Cleaning up prompts listener');
      window.removeEventListener('promptSaved', handlePromptSaved);
    };
  }, [user]); // Removed prompts.length dependency

  if (loading) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
        <div className="text-center py-8">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Loading prompts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="mr-2">📜</span>
        Your Prompts ({prompts.length})
      </h3>
      
      {prompts.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">No prompts yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Create your first prompt above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {prompts.map((p, index) => (
            <div key={p.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium mb-1">
                    Prompt #{prompts.length - index}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{p.prompt}</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                  {new Date(p.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
