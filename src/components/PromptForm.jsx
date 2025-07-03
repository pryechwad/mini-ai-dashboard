import { useState } from "react";
import { savePrompt } from "@/services/firestoreService";
import { savePromptLocal } from "@/services/localStorageService";
import { useAuth } from "@/context/AuthContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!prompt.trim() || !user) {
      console.log('Cannot save prompt:', { prompt: prompt.trim(), user: !!user });
      return;
    }
    
    setLoading(true);
    console.log('Saving prompt:', prompt.trim(), 'for user:', user.uid);
    
    try {
      // Use localStorage directly for reliable persistence
      console.log('💾 Saving prompt to localStorage:', prompt.trim());
      const savedPrompt = savePromptLocal(user.uid, prompt.trim());
      console.log('✅ Prompt saved successfully:', savedPrompt);
      
      // Verify it was saved
      const allPrompts = JSON.parse(localStorage.getItem(`ai_dashboard_prompts_${user.uid}`) || '[]');
      console.log('📊 Total prompts for user:', allPrompts.length);
      
      setPrompt("");
      // Trigger a custom event to notify PromptList
      window.dispatchEvent(new CustomEvent('promptSaved'));
      console.log('📢 Event dispatched to refresh prompt list');
    } catch (error) {
      console.error('❌ Error saving prompt:', error);
      alert('Failed to save prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="mr-2">✍️</span>
        Create New Prompt
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input 
            value={prompt} 
            onChange={e => setPrompt(e.target.value)} 
            placeholder="Enter your AI prompt here..." 
            className="w-full"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!prompt.trim() || loading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Saving...' : '🚀 Submit Prompt'}
        </Button>
      </form>
    </div>
  );
}
