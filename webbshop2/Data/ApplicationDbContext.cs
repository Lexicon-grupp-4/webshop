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
            modelBuilder.Entity<Product>().HasData(new Product { Id = 1, Name = "Hammare", Price = 100, Quantity = 20 ,PictureUrl = "/images/products/p.png",Description="description",Brand="brand",Type="type" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 2, Name = "Köttbulletång", Price = 210, Quantity = 6,PictureUrl = "/images/products/p.png" ,Description="description",Brand="brand",Type="type" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 3, Name = "Borrmaskin", Price = 2000, Quantity = 3 ,PictureUrl = "/images/products/p.png",Description="description",Brand="brand",Type="type" });
            modelBuilder.Entity<Product>().HasData(new Product {  Id = 4, Name = "Skruvmejsel", Price = 250, Quantity = 300, PictureUrl = "/images/products/p.png", Description = "description", Brand = "brand", Type = "type" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 5, Name = "Såg", Price = 300, Quantity = 120, PictureUrl = "/images/products/p.png", Description = "description", Brand = "brand", Type = "type" });
           
        }
    }
}
