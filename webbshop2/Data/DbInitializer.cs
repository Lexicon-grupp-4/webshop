using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Authentication;
using webbshop2.Models;

namespace webbshop2.Data
{
    public class DbInitializer
    {
        public static async Task<bool> Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Products.Any())
            {
                return false;   // DB has been seeded
            }

            //string user10Id = "577d7a59-0221-4bb7-be67-3bbaad46022c";
            //string user11Id = "ff92bb06-898e-4f2d-815f-50b00fb9793d";

            //var user1 = new ApplicationUser
            //{
            //    Id = user10Id,
            //    UserName = "user10",
            //    NormalizedUserName = "USER10",
            //    Email = "user10@mail.com",
            //    NormalizedEmail = "USER10@MAIL.COM",
            //    EmailConfirmed = false,
            //    PasswordHash = "AQAAAAEAACcQAAAAEGrOtfDoRSMoDzZIJQezM2L6RZT6p29njfdR39As1sVaayeyQdTmO/B7gpFyU7oWIw==",
            //    SecurityStamp = "KN4FJD2GJLMBVIJVAI3DQ2V7KNF5MMPC",
            //    ConcurrencyStamp = "7d1278d2-5d20-4751-ba32-f7583a77378b"
            //};
            //var user2 = new ApplicationUser
            //{
            //    Id = user11Id,
            //    UserName = "user11",
            //    NormalizedUserName = "USER11",
            //    Email = "user11@mail.com",
            //    NormalizedEmail = "USER11@MAIL.COM",
            //    EmailConfirmed = false,
            //    PasswordHash = "AQAAAAEAACcQAAAAEE0TKhUTEhl/cl+l4FLqd4j+pCxcXTaFLzA3NcEaqf8ehF32TrTPivjd8btLJOTFAg==",
            //    SecurityStamp = "Y6QUHHD5OKKA5OWYUV3TKEMQBAYWUMJX",
            //    ConcurrencyStamp = "d8775de6-d2ce-4954-b688-c044d5fb7847"
            //};

            //context.Users.Add(user1);
            //context.Users.Add(user2);

            //var user1Role = new IdentityUserRole<string> { RoleId = UserRolesId.User, UserId = user10Id };
            //var user2Role = new IdentityUserRole<string> { RoleId = UserRolesId.User, UserId = user11Id };

            //context.UserRoles.Add(user1Role);
            //context.UserRoles.Add(user2Role);

            Product prod1 = new Product { Id = 2001, Name = "Hammare", Price = 100, Quantity = 20, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod2 = new Product { Id = 2002, Name = "Köttbulletång", Price = 210, Quantity = 6, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod3 = new Product { Id = 2003, Name = "Borrmaskin", Price = 2000, Quantity = 3, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod4 = new Product { Id = 2004, Name = "Skruvmejsel", Price = 250, Quantity = 300, PictureUrl = "/images/products/p.png", Description = "description" };
            Product prod5 = new Product { Id = 2005, Name = "Såg", Price = 300, Quantity = 120, PictureUrl = "/images/products/p.png", Description = "description" };

            context.Products.Add(prod1);
            context.Products.Add(prod2);
            context.Products.Add(prod3);
            context.Products.Add(prod4);
            context.Products.Add(prod5);

            //context.SaveChanges();
            await context.SaveChangesAsync();

            return true;
        }
    }
}
