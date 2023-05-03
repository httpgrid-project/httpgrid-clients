using Microsoft.AspNetCore.Mvc;
using HTTPgrid.net;

namespace HTTPgrid.Example.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallbackController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var webhook = new Webhook("i9viqa5vxx78hcxh4rwdm8x7791");

            Request.Headers.TryGetValue("X-Signature", out var headerStringValues);

            var header = headerStringValues.ToString();

            using (var streamReader = new StreamReader(Request.Body))
            {
                var body = streamReader.ReadToEnd();

                if (!webhook.Verify(header, body))
                {
                    return Unauthorized();
                }
            }

            return Ok();
        }
    }
}
