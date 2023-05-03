import { Endpoint } from './endpoint';
import { Message } from './message';
import { Root } from './root';

export interface EndpointMessage extends Root {
  attempts: Array<{ statusCode: number; timestamp: number }>;

  attemptCount: number;

  endpoint: Endpoint;

  message: Message;

  nextAttemptTimestamp: number | null;

  status: 'pending' | 'sending' | 'success' | 'failed' | 'disabled';

  timestamp: number | null;
}
