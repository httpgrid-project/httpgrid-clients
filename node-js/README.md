# HTTPgrid (Node.js)

## Getting Started

### Installation

Install the package with:

```sh
npm install httpgrid
# or
yarn add httpgrid
```

### Usage

```typescript
import { HTTPgrid } from 'httpgrid';

const httpGrid = new HTTPgrid('AUTH_TOKEN');

(async () => {
  const application = await httpGrid.application.create({
    name: 'My Application',
    uid: 'my-application',
  });

  const endpoint = await httpGrid.endpoint.create(application.id, {
    channels: [],
    enabled: true,
    eventTypes: ['user.created'],
    headers: {},
    name: 'My Endpoint',
    uid: 'my-endpoint',
    url: 'https://....',
  });

  const message = await httpGrid.message.create(application.id, {
    channels: [],
    eventType: 'user.created',
    payload: {
      email: 'foo.bar@example.com',
    },
  });
})();
```
