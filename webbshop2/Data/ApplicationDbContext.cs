using Microsoft.EntityFrameworkCore;
using webbshop2.Authentication;
using webbshop2.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace webbshop2.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(new Product { Id = 1, Name = "Hammare", Price = 100, Quantity = 20, PictureUrl = "/images/products/p.png", Description = "description", Brand = "brand", Type = "type" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 2, Name = "Köttbulletång", Price = 210, Quantity = 6, PictureUrl = "/images/products/p.png", Description = "description", Brand = "brand", Type = "type" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 3, Name = "Borrmaskin", Price = 2000, Quantity = 3, PictureUrl = "/images/products/p.png", Description = "description", Brand = "brand", Type = "type" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 4, Name = "Skruvmejsel", Price = 250, Quantity = 300, PictureUrl = "/images/products/p.png", Description = "description", Brand = "brand", Type = "type" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 5, Name = "Såg", Price = 300, Quantity = 120, PictureUrl = "/images/products/p.png", Description = "description", Brand = "brand", Type = "type" });

            string adminId = "33734c07-3f1a-4b37-8330-5e947c2a9d57";
            string user10Id = "577d7a59-0221-4bb7-be67-3bbaad46022c";
            string user11Id = "ff92bb06-898e-4f2d-815f-50b00fb9793d";

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = UserRolesId.User,
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = "82261118-f4a2-410b-a505-0abc05c50f0b"
                }, new IdentityRole
                {
                    Id = UserRolesId.Admin,
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "cdcaa373-39c4-4c9d-ada2-af67cead244f"
                });


            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
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
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = user10Id,
                UserName = "user10",
                NormalizedUserName = "USER10",
                Email = "user10@mail.com",
                NormalizedEmail = "USER10@MAIL.COM",
                EmailConfirmed = false,
                PasswordHash = "AQAAAAEAACcQAAAAEGrOtfDoRSMoDzZIJQezM2L6RZT6p29njfdR39As1sVaayeyQdTmO/B7gpFyU7oWIw==",
                SecurityStamp = "KN4FJD2GJLMBVIJVAI3DQ2V7KNF5MMPC",
                ConcurrencyStamp = "7d1278d2-5d20-4751-ba32-f7583a77378b"
            });
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = user11Id,
                UserName = "user11",
                NormalizedUserName = "USER11",
                Email = "user11@mail.com",
                NormalizedEmail = "USER11@MAIL.COM",
                EmailConfirmed = false,
                PasswordHash = "AQAAAAEAACcQAAAAEE0TKhUTEhl/cl+l4FLqd4j+pCxcXTaFLzA3NcEaqf8ehF32TrTPivjd8btLJOTFAg==",
                SecurityStamp = "Y6QUHHD5OKKA5OWYUV3TKEMQBAYWUMJX",
                ConcurrencyStamp = "d8775de6-d2ce-4954-b688-c044d5fb7847"
            });

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = UserRolesId.Admin,
                    UserId = adminId
                }
            );
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = UserRolesId.User,
                    UserId = user10Id
                }
            );
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = UserRolesId.User,
                    UserId = user11Id
                }
            );
        }
    }
}
