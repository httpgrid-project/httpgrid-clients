import { Root } from './root';

export interface Message extends Root {
  channels: Array<string>;

  eventType: string;

  payload: any;

  uid: string;
}
