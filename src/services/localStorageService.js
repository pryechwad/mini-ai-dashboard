// Simple localStorage-based persistence as fallback
const PROMPTS_KEY = 'ai_dashboard_prompts';
const CHAT_KEY = 'ai_dashboard_chat';

export const savePromptLocal = (uid, prompt) => {
  const prompts = getPromptsLocal(uid);
  const newPrompt = {
    id: Date.now().toString(),
    uid,
    prompt,
    timestamp: Date.now()
  };
  prompts.push(newPrompt);
  localStorage.setItem(`${PROMPTS_KEY}_${uid}`, JSON.stringify(prompts));
  return newPrompt;
};

export const getPromptsLocal = (uid) => {
  const stored = localStorage.getItem(`${PROMPTS_KEY}_${uid}`);
  return stored ? JSON.parse(stored) : [];
};

export const saveChatLocal = (message) => {
  const messages = getChatLocal();
  const newMessage = {
    id: Date.now().toString(),
    ...message,
    timestamp: Date.now()
  };
  messages.push(newMessage);
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  return newMessage;
};

export const getChatLocal = () => {
  const stored = localStorage.getItem(CHAT_KEY);
  return stored ? JSON.parse(stored) : [];
};