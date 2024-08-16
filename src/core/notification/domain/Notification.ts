export interface Notification {
  id: string
  title: string
  body: NotificationBody
  read: boolean
  createdAt: Date
}

export type NotificationBody = NotificationBodyUserHasCommented

export interface NotificationBodyUserHasCommented {
  postId: string
  commentExtract: string
  userId: string
}