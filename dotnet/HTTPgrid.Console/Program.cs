// See https://aka.ms/new-console-template for more information
using HTTPgrid.net;
using HTTPgrid.net.Requests;

var httpGridClient = new HTTPgridClient("AUTH_TOKEN");

var result = httpGridClient.Message.Create("my-application", new MessageRequest
{
    Channels = new string[0],
    EventType = "user.created",
    Payload = new 
    {
        Email = "foo.bar@example.com"
    },
    Uid = "my-message-id"
}).GetAwaiter().GetResult();
