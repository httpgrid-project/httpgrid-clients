# HTTPgrid (cURL)

## Getting Started

### Usage

#### POST Application

```bash
curl -X 'POST' \
  'https://api.httpgrid.com/api/v1/applications' \
  -H 'Accept: application/json' \ 
  -H 'Authorization: AUTH_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "My Application",
  "uid": "my-application"
}'
```

#### POST Endpoint

```bash
curl -X 'POST' \
  'https://api.httpgrid.com/api/v1/applications/my-application/endpoints' \
  -H 'Accept: application/json' \
  -H 'Authorization: AUTH_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
  "channels": [],
  "enabled": true,
  "eventTypes": ["user.created"],
  "headers": {},
  "name": "My Endpoint",
  "uid": "my-endpoint",
  "url": "https://...."
}'
```

#### POST Message

```bash
curl -X 'POST' \
  'https://api.httpgrid.com/api/v1/applications/my-application/messages' \
  -H 'Accept: application/json' \ 
  -H 'Authorization: AUTH_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
  "channels": [],
  "eventType": "user.created",
  "uid": "my-message",
  "payload": { "email": "foo.bar@example.com" }
}'
```
