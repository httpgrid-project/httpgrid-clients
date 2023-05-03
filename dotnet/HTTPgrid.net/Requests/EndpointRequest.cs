namespace HTTPgrid.net.Requests
{
    public class EndpointRequest
    {
        public string[] Channels { get; set; }

        public bool Enabled { get; set; }

        public string[] EventTypes { get; set; }

        public Dictionary<string, string> Headers { get; set; }

        public string Name { get; set; }

        public string Uid { get; set; }

        public string Url { get; set; }
    }
}
