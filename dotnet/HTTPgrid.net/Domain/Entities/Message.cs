namespace HTTPgrid.net.Domain.Entities
{
    public class Message : Root
    {
        public string[] Channels { get; set; }

        public string EventType { get; set; }

        public object Payload { get; set; }

        public string Uid { get; set; }
    }
}
