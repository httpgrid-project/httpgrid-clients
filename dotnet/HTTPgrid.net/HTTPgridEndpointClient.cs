using HTTPgrid.net.Domain.Entities;
using HTTPgrid.net.Requests;
using System.Net.Http.Json;

namespace HTTPgrid.net
{
    public class HTTPgridEndpointClient
    {
        protected readonly HttpClient _httpClient;

        public HTTPgridEndpointClient(HttpClient httpClient)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));   
        }

        public async Task<Endpoint?> Create(string applicationId, EndpointRequest endpointRequest)
        {
            var httpResponseMessage = await _httpClient.PostAsJsonAsync($"applications/{applicationId}/endpoints", endpointRequest);

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                throw new Exception("unable to create endpoint");
            }

            return await httpResponseMessage.Content.ReadFromJsonAsync<Endpoint>();
        }
    }
}
