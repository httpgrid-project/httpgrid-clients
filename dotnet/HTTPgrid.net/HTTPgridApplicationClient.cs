using HTTPgrid.net.Domain.Entities;
using HTTPgrid.net.Requests;
using System.Net.Http.Json;

namespace HTTPgrid.net
{
    public class HTTPgridApplicationClient
    {
        protected readonly HttpClient _httpClient;

        public HTTPgridApplicationClient(HttpClient httpClient)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));   
        }

        public async Task<Application?> Create(ApplicationRequest applicationRequest)
        {
            var httpResponseMessage = await _httpClient.PostAsJsonAsync($"applications", applicationRequest);

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                throw new Exception("unable to create application");
            }

            return await httpResponseMessage.Content.ReadFromJsonAsync<Application>();
        }

        public async Task<Application?> Find(string applicationId)
        {
            var httpResponseMessage = await _httpClient.GetAsync($"applications/{applicationId}");

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                if (httpResponseMessage.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return null;
                }

                throw new Exception("unable to find application");
            }

            return await httpResponseMessage.Content.ReadFromJsonAsync<Application>();
        }
    }
}
