using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Authentication;
using webbshop2.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace webbshop2.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        //public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(new Product { Id = 1, Name = "Hammare", Price = 100, Antal = 20 });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 2, Name = "Borrmaskin", Price = 2000, Antal = 3 });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 3, Name = "Såg", Price = 300, Antal = 120 });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 4, Name = "Skruvmejsel", Price = 250, Antal = 300 });

            //modelBuilder.Entity<User>().HasData(
            //    new User { 
            //        Id = 1, 
            //        Name = "admin", 
            //        Email = "admin@mail.com", 
            //        Password = BCrypt.Net.BCrypt.HashPassword("aaa")
            //    });
            //modelBuilder.Entity<User>().HasData(
            //    new User
            //    {
            //        Id = 2,
            //        Name = "user1",
            //        Email = "user1@mail.com",
            //        Password = BCrypt.Net.BCrypt.HashPassword("aaa")
            //    });
            //modelBuilder.Entity<User>().HasData(
            //    new User
            //    {
            //        Id = 3,
            //        Name = "user2",
            //        Email = "user2@mail.com",
            //        Password = BCrypt.Net.BCrypt.HashPassword("aaa")
            //    });
        }
    }
}
