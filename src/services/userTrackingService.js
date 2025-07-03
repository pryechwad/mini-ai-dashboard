// Track real user registrations in localStorage
const USER_REGISTRY_KEY = 'ai_dashboard_user_registry';

export const registerUser = (uid, email) => {
  try {
    const registry = getUserRegistry();
    registry[uid] = {
      email,
      registrationDate: Date.now(),
      lastLogin: Date.now()
    };
    localStorage.setItem(USER_REGISTRY_KEY, JSON.stringify(registry));
    console.log('✅ User registered:', email);
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

export const getUserRegistry = () => {
  try {
    const stored = localStorage.getItem(USER_REGISTRY_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error getting user registry:', error);
    return {};
  }
};

export const updateUserLogin = (uid) => {
  try {
    const registry = getUserRegistry();
    if (registry[uid]) {
      registry[uid].lastLogin = Date.now();
      localStorage.setItem(USER_REGISTRY_KEY, JSON.stringify(registry));
    }
  } catch (error) {
    console.error('Error updating user login:', error);
  }
};