using Microsoft.EntityFrameworkCore;
using webbshop2.Authentication;
using webbshop2.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace webbshop2.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Order>()
                .HasMany(c => c.OrderItems)
                .WithOne(e => e.Order)
                .IsRequired();

            modelBuilder.Entity<Order>()
                .HasOne(c => c.Customer);

            modelBuilder.Entity<OrderItem>()
                .HasOne(c => c.Order)
                .WithMany(o => o.OrderItems);

            modelBuilder.Entity<OrderItem>()
                .HasOne(c => c.Product);

            string adminId = "33734c07-3f1a-4b37-8330-5e947c2a9d57";

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = UserRolesId.User,
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = "82261118-f4a2-410b-a505-0abc05c50f0b"
                },
                new IdentityRole
                {
                    Id = UserRolesId.Admin,
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "cdcaa373-39c4-4c9d-ada2-af67cead244f"
                });

            // maybe keep the admin account from start

            modelBuilder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = adminId,
                    UserName = "admin",
                    NormalizedUserName = "ADMIN",
                    Email = "admin@mail.com",
                    NormalizedEmail = "ADMIN@MAIL.COM",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAENOinM9VCukuhFocb5q4uKg6YyqXUfPmTjNYp9s39yO/i3UbieyWLon9JXTeeZvfSw==",
                    SecurityStamp = "JLWGJISJQWEYTH3BZGOBFQTWVPHLCGMJ",
                    ConcurrencyStamp = "697e2c0e-ec25-43e5-9bd1-ceecf0751f0b"
                });

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string> { RoleId = UserRolesId.Admin, UserId = adminId }
            );
        }
    }
}
