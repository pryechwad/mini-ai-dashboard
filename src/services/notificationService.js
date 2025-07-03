// User notification system
const NOTIFICATIONS_KEY = 'ai_dashboard_notifications';

export const addNotification = (uid, notification) => {
  try {
    const notifications = getUserNotifications(uid);
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      timestamp: Date.now(),
      read: false
    };
    notifications.unshift(newNotification);
    localStorage.setItem(`${NOTIFICATIONS_KEY}_${uid}`, JSON.stringify(notifications));
    console.log('✅ Notification added for user:', uid);
    return newNotification;
  } catch (error) {
    console.error('Error adding notification:', error);
  }
};

export const getUserNotifications = (uid) => {
  try {
    const stored = localStorage.getItem(`${NOTIFICATIONS_KEY}_${uid}`);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = (uid, notificationId) => {
  try {
    const notifications = getUserNotifications(uid);
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem(`${NOTIFICATIONS_KEY}_${uid}`, JSON.stringify(updated));
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};