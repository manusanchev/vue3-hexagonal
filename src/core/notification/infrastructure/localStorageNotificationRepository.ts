import type { NotificationRepository } from '@/core/notification/domain/NotificationRepository'
import type { Notification } from '@/core/notification/domain/Notification'

export const localStorageNotificationRepository = (): NotificationRepository => {
  const getAll = async (): Promise<Notification[]> => {
    return JSON.parse(localStorage.getItem('notifications') || '[]')
  }

  const markAllRead = async (): Promise<void> => {
    const notifications: Notification[] = await getAll()
    notifications.forEach(notification => {
      notification.read = true
    })
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }

  return {
    getAll,
    markAllRead
  }
}