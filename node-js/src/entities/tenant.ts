import { Root } from './root';

export interface Tenant extends Root {
  keys: Array<string>;

  name: string;
}
