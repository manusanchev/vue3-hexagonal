import { injectDependency } from '@/core/shared/infrastructure/dependencies/injectDependency'
import type { NotificationRepository } from '@/core/notification/domain/NotificationRepository'
import type { Notification } from '@/core/notification/domain/Notification'

export const getAllNotifications = () => {
  const execute = async ():Promise<Notification[]> => {
    const { notificationRepository } = await dependencies()
    return await notificationRepository.getAll()
  }

  return {
    execute
  }
}

const dependencies = async () => {
  const notificationRepository = await injectDependency<NotificationRepository>(import("@/core/notification/infrastructure/localStorageNotificationRepository"));
  return { notificationRepository }
}