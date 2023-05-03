export interface EndpointRequest {
  channels: Array<string>;

  enabled: boolean;

  eventTypes: Array<string>;

  headers: { [key: string]: string };

  name: string;

  uid: string;

  url: string;
}
