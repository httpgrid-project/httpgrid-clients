using System.Security.Cryptography;
using System.Text;

namespace HTTPgrid.net
{
    public class Webhook
    {
        private readonly HMACSHA256 _crypto;

        public Webhook(string secret)
        {
            var secretBytes = Encoding.UTF8.GetBytes(secret);

            _crypto = new HMACSHA256(secretBytes);
        }

        public bool Verify(string header, string body)
        {
            var headerSplitted = header.Split(',');

            var timestamp = GetTimestamp(headerSplitted[0]);

            var age = Math.Abs(timestamp - DateTimeOffset.UtcNow.ToUnixTimeSeconds());

            if (age > 300)
            {
                return false;
            }

            var content = $"{timestamp}.{body}";

            var contentBytes = Encoding.ASCII.GetBytes(content);

            var signature = Convert.ToHexString(_crypto.ComputeHash(contentBytes)).ToLower();

            for (var i = 1; i < headerSplitted.Length; i++)
            {
                var s = headerSplitted[i];

                var sSplitted = s.Split("=");

                if (sSplitted.Length != 2)
                {
                    continue;
                }

                if (signature.Equals(sSplitted[1]))
                {
                    return true;
                }
            }

            return false;
        }

        private int GetTimestamp(string timestampStr)
        {
            if (string.IsNullOrEmpty(timestampStr))
            {
                return 0;
            }

            var timestampStrSplitted = timestampStr.Split("=");

            if (timestampStrSplitted.Length != 2)
            {
                return 0;
            }

            return int.Parse(timestampStrSplitted[1]);
        }
    }
}
