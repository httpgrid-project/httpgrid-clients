# HTTPgrid.Example

## Introduction

In this scenario, there is a .NET Core API which enables merchants to initiate refunds through an endpoint. As per the request from merchants, there is a need to introduce webhook functionality for receiving instantaneous notifications about the initiation and processing of refunds.

To achieve this objective, we plan to leverage [HTTPgrid](https://httpgrid.com) for adding webhook capabilities to our API. The proposed approach entails generating an individual application for each merchant in [HTTPgrid](https://httpgrid.com), thereby enabling each merchant to specify one or more endpoints for receiving events/messages.

![HTTPgrid](Assets/diagram.png)

## Install

Install the .NET Core library on your project or solution.

```bash
dotnet add package HTTPgrid.net
```

## Setup

Register the `HTTPgrid` with your dependency injection container.

```csharp
builder.Services
    .AddTransient((serviceProvider) => new HTTPgridClient("AUTH_TOKEN"));
```

## Implement

- Ensure the required `using` statements are added to your file.
- Declare the `HTTPgridClient` field in your controller `class`.
- Assign the `HTTPgridClient` field in the constructor of your controller `class`.
- Use the `HTTPgridClient` instance to make a request to [HTTPgrid](https://httpgrid.com) in your controller method(s).

````csharp
using HTTPgrid.net;
using HTTPgrid.net.Requests;

[ApiController]
[Route("api/[controller]")]
public class RefundsController : ControllerBase
{
    private readonly HTTPgridClient _httpGridClient;

    public RefundsController(HTTPgridClient httpGridClient)
    {
        _httpGridClient = httpGridClient ?? throw new ArgumentNullException(nameof(httpGridClient));
    }

    [HttpPost]
    public async Task<IActionResult> Post(string id)
    {
        // We'll use the JSON Web Token(JWT) to determine the applicationId of the merchant making the request
        var applicationId = GetApplicationIdFromToken();

        // Initiate refund via our domain service
        var transaction = await _refundsService.Initiate(id);

        // Making a request to HTTPgrid to send the event/message
        await _httpGridClient.Message.Create(applicationId, new MessageRequest
        {
            Channels = new string[] { },
            EventType = "refund.pending",
            Payload = transaction,
            Uid = transaction.Id.ToString(),
        });

        return Ok(transaction);
    }
}
```
````
