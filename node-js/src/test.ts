import { Application, Endpoint, HTTPgrid } from './index';

(async () => {
  const httpGrid = new HTTPgrid(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZWYxN2U3Ni1mMTM5LTRiMTItOGI5NS0yYjQzMzY1ZThhOGEiLCJuYW1lIjoiS2F0YW5hIiwiaWF0IjoxNTE2MjM5MDIyfQ.x3JbKM6cRh-DMp5pG8DuW070eMT96bwDz_HsT0upuoE'
  );

  let application: Application | null = await httpGrid.application.find(
    'application-name'
  );

  if (!application) {
    application = await httpGrid.application.create({
      name: 'Application name',
      uid: 'application-name',
    });
  }

  console.log(application);

  let endpoint: Endpoint | null = await httpGrid.endpoint.find(
    application.id,
    'my-endpoint'
  );

  if (!endpoint) {
    endpoint = await httpGrid.endpoint.create(application.id, {
      channels: [],
      enabled: true,
      eventTypes: ['user.created'],
      headers: {},
      name: 'My Endpoint',
      uid: 'my-endpoint',
      url: 'https://webhook.site/34ee63fd-4476-4f56-a675-e14472f0ffa6',
    });
  }

  console.log(endpoint);

  const message = await httpGrid.message.create(application.id, {
    channels: [],
    eventType: 'user.created',
    payload: {
      email: 'foo.bar@example.com',
    },
  });

  console.log(message);
})();
