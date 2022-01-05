using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Models;

namespace webbshop2.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(new Product { Id = 1, Name = "Hammare", Price = 100, Quantity = 20 });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 2, Name = "Borrmaskin", Price = 2000, Quantity = 3 });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 3, Name = "Såg", Price = 300, Quantity = 120 });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 4, Name = "Skruvmejsel", Price = 250, Quantity = 300 });
        }
    }
}
