import type { Notification } from '@/core/notification/domain/Notification'

export interface NotificationRepository {
  getAll(): Promise<Notification[]>
  markAllRead(): Promise<void>
}