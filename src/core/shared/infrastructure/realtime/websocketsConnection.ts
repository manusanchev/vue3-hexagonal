import type { RealtimeClient } from '@/core/shared/domain/realtime/realtimeClient';
import type { RealtimeSubscriptionData } from '@/core/shared/domain/realtime/realtimeSubscriptionData';

let ws: WebSocket | null = null;
const subscriptions: Map<string, Function> = new Map();

export const websocketsConnection = (): RealtimeClient => {
  const connect = (userId: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      return;
    }

    // TODO: move to env
    ws = new WebSocket(`ws://localhost:8080?userId=${userId}`);

    ws.onmessage = (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data) as RealtimeSubscriptionData;
      const callback = subscriptions.get(data.event);
      if (callback) {
        callback(data.payload);
      }
    };
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      ws = null;
      console.log('WebSocket connection closed');
    }
    subscriptions.clear();
  };

  const subscribe = (event: string, callback: Function) => {
    subscriptions.set(event, callback);
  };

  const unsubscribe = (event: string) => {
    subscriptions.delete(event);
  };

  return {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
  };
};
