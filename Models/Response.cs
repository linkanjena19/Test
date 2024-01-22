namespace JWTAuth.Models
{
    public class Response
    {
        public string Status { get; set; }
        public dynamic Data { get; set; }
    }
    public class Error
    {
        public dynamic Message { get; set; }
    }
}
