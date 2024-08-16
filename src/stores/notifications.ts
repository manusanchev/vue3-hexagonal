import { defineStore } from 'pinia'
import type { Notification } from '@/core/notification/domain/Notification'


export const useNotificationStore = defineStore('notifications', {
  state: () => {
    return {
      notifications: [] as Notification[],
    }
  },
  actions: {
    addNotification(notification: Notification) {
      this.notifications.unshift(notification)
    },
    addNotifications(notifications: Notification[]) {
      this.notifications = notifications;
    }
  },
})