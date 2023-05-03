namespace HTTPgrid.net
{
    public class HTTPgridClient
    {
        public readonly HTTPgridApplicationClient Application;

        public readonly HTTPgridEndpointClient Endpoint;

        public readonly HTTPgridMessageClient Message;

        public HTTPgridClient(string token) {
            var httpClient = new HttpClient();

            httpClient.BaseAddress = new Uri("https://api.httpgrid.com/api/v1/");

            // httpClient.BaseAddress = new Uri("http://localhost:8080/api/v1/");

            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            Application = new HTTPgridApplicationClient(httpClient);

            Message = new HTTPgridMessageClient(httpClient);

            Endpoint = new HTTPgridEndpointClient(httpClient);
        } 
    }
}