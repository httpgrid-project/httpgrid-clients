namespace HTTPgrid.net.Requests
{
    public class MessageRequest
    {
        public string[] Channels { get; set; }

        public string EventType { get; set; }

        public object Payload { get; set; }

        public string Uid { get; set; }
    }
}
