using Microsoft.EntityFrameworkCore;
using MainRandevuBackend.Models;

namespace MainRandevuBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Admin> Admins { get; set; }
    }
}
