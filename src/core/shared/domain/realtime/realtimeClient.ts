export interface RealtimeClient {
  connect(userId: string): void;
  disconnect(): void;
  subscribe(event: string, callback: Function): void;
  unsubscribe(event: string): void;
}
