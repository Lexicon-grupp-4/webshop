using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using webbshop2.Authentication;
using webbshop2.Models;

namespace webbshop2.Data
{
    public class DbSeedData
    {
        readonly ApplicationDbContext _context;

        public DbSeedData(ApplicationDbContext context)
        {
            _context = context;
        }

        /**
         * Example data for development.
         * Note: failing when running async
         **/
        public void Seed()
        {
            if (_context.Products.Any())
            {
                return;   // DB has been seeded
            }

            Product prod1 = new Product { Name = "Hammare", Price = 100, Quantity = 20, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod2 = new Product { Name = "Köttbulletång", Price = 210, Quantity = 6, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod3 = new Product { Name = "Borrmaskin", Price = 2000, Quantity = 3, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod4 = new Product { Name = "Skruvmejsel", Price = 250, Quantity = 300, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod5 = new Product { Name = "Såg", Price = 300, Quantity = 120, PictureUrl = "/images/products/p.png", Description = "description" };

            _context.Products.Add(prod1);
            _context.Products.Add(prod2);
            _context.Products.Add(prod3);
            _context.Products.Add(prod4);
            _context.Products.Add(prod5);

            _context.SaveChanges();

            string user10Id = "577d7a59-0221-4bb7-be67-3bbaad46022c";
            string user11Id = "ff92bb06-898e-4f2d-815f-50b00fb9793d";
            var user1 = new ApplicationUser
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
            };
            var user2 = new ApplicationUser
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
            };

            _context.Users.Add(user1);
            _context.Users.Add(user2);

            _context.SaveChanges();

            var user1Role = new IdentityUserRole<string> { RoleId = UserRolesId.User, UserId = user10Id };
            var user2Role = new IdentityUserRole<string> { RoleId = UserRolesId.User, UserId = user11Id };

            _context.UserRoles.Add(user1Role);
            _context.UserRoles.Add(user2Role);
            _context.SaveChanges();

            Order oder1 = new Order { Customer = user1, Date = DateTime.Now, Status = OrderStatus.Processing };
            Order oder2 = new Order { Customer = user1, Date = DateTime.Now, Status = OrderStatus.Problem };

            _context.Orders.Add(oder1);
            _context.Orders.Add(oder2);
            _context.SaveChanges();

            OrderItem order1Item1 = new OrderItem { Order = oder1, Product = prod1, Price = prod1.Price, Quantity = 1 };
            OrderItem order1Item2 = new OrderItem { Order = oder1, Product = prod2, Price = prod2.Price, Quantity = 1 };
            OrderItem order1Item3 = new OrderItem { Order = oder1, Product = prod3, Price = prod3.Price * 3, Quantity = 3 };
            OrderItem order2Item1 = new OrderItem { Order = oder2, Product = prod4, Price = prod5.Price, Quantity = 1 };
            OrderItem order2Item2 = new OrderItem { Order = oder2, Product = prod5, Price = prod5.Price, Quantity = 1 };

            _context.OrderItems.Add(order1Item1);
            _context.OrderItems.Add(order1Item2);
            _context.OrderItems.Add(order1Item3);
            _context.OrderItems.Add(order2Item1);
            _context.OrderItems.Add(order2Item2);
            _context.SaveChanges();
        }
    }
}
