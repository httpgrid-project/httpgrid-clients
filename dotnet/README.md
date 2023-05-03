# HTTPgrid (.NET)

## Getting Started

### Installation

Install the package with:

```sh
dotnet add package HTTPgrid.net
# or
NuGet\Install-Package HTTPgrid.net
```

### Usage

```csharp
using HTTPgrid.net;
using HTTPgrid.net.Domain.Entities;

var httpGridClient = new HTTPgridClient("AUTH_TOKEN");

var message = await httpGridClient.Message.Create("my-application", new Message
{
    Channels = new string[0],
    EventType = "user.created",
    Payload = new 
    {
        Email = "foo.bar@example.com"
    },
    Uid = "my-message-id"
});
```
