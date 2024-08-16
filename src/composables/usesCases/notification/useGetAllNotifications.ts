import type { composableParent } from '@/composables/composableParent'
import { getAllNotifications } from '@/core/notification/application/getAllNotifications'
import { useNotificationStore } from '@/stores/notifications'
export const useGetAllNotifications = async (): Promise<composableParent> => {
  const { execute } = getAllNotifications()
  const notificationStore = useNotificationStore()
  const notifications = await execute()
  notificationStore.addNotifications(notifications)

  return {
    data: null,
    error: null,
  }
}