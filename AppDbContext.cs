using JWTAuth.Models;
using Microsoft.EntityFrameworkCore;

namespace JWTAuth
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Security> Tbl_Security { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
