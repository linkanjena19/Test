using System.ComponentModel.DataAnnotations;

namespace JWTAuth.Models
{
    public class Security
    {
        [Key]
        public int Id { get; set; }
        public string? User_Name { get; set; }
        public string? Password { get; set; }
    }
}
