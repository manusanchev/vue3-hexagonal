import { websocketsConnection } from '@/core/shared/infrastructure/realtime/websocketsConnection'

export default {
  install(app: any) {
    websocketsConnection().connect(localStorage.getItem('userId')!)
    app.provide('socket', websocketsConnection());
  }
}