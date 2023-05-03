using Microsoft.AspNetCore.Mvc;
using HTTPgrid.net;
using HTTPgrid.net.Requests;

namespace HTTPgrid.Example.Controllers
{
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
            await _httpGridClient.Message.Create(GetApplicationIdFromToken(), new MessageRequest
            {
                Channels = new string[] { },
                EventType = "refund.pending",
                Payload = new {
                    Id = id
                },
                Uid = id.ToString(),
            });

            return Ok();
        }

        private string GetApplicationIdFromToken()
        {
            return "tenant-1";
        }
    }
}