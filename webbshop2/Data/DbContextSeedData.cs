using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
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

            // Some arbitrary hierarchical categories
            Category root = new Category() { Name = "root" };
            Category c1_furniture = new Category() { Name = "Möbler", Parent = root };
            Category c11 = new Category() { Name = "Bord", Parent = c1_furniture };
            Category c12 = new Category() { Name = "Stolar", Parent = c1_furniture };
            Category c2_tools = new Category() { Name = "Verktyg", Parent = root };
            Category c21 = new Category() { Name = "Snickar Verktyg", Parent = c2_tools };
            Category c22 = new Category() { Name = "Mekaniker Verktyg", Parent = c2_tools };
            Category c3_clothes = new Category() { Name = "Kläder", Parent = root };
            Category c31 = new Category() { Name = "Tröjor", Parent = c3_clothes };
            Category c32 = new Category() { Name = "Byxor", Parent = c3_clothes };
            Category c33 = new Category() { Name = "Hattar", Parent = c3_clothes };
            Category c4_vehicles = new Category() { Name = "Fordon", Parent = root };
            Category c41 = new Category() { Name = "Cycklar", Parent = c4_vehicles };
            Category c42 = new Category() { Name = "Mopeder", Parent = c4_vehicles };
            Category c5_art = new Category() { Name = "Konst", Parent = root };
            Category c51 = new Category() { Name = "Bildkonst", Parent = c5_art };
            Category c52 = new Category() { Name = "Skulpturer", Parent = c5_art };
            Category c6_media = new Category() { Name = "Media", Parent = root };
            Category c61 = new Category() { Name = "Böcker", Parent = c6_media };
            Category c62 = new Category() { Name = "Tidningar", Parent = c6_media };

            var categories = new Category[]
            {
                root,
                c1_furniture, c11, c12,
                c2_tools, c21, c22,
                c3_clothes, c31, c32, c33,
                c4_vehicles, c41, c42,
                c5_art, c51, c52,
                c6_media, c61, c62,
            };

            foreach (Category c in categories)
            {
                _context.Categories.Add(c);
            }

            var prods = new Product[]
            {
                new Product {
                    Name = "Hammare", Category = c21,
                    Price = 100, Quantity = 20,
                    Description = "600 kilogram." },
                new Product {
                    Name = "Flaktång", Category = c22,
                    Price = 210,  Quantity = 6,
                    Description = "Greppvänlig, huvudsakligen i plastmaterial."
                },
                new Product {
                    Name = "Borrmaskin", Category = c22,
                    Price = 2000, Quantity = 3,
                    Description = "Med 10 extra borr."
                },
                new Product {
                    Name = "Skruvmejsel", Category = c22,
                    Price = 250, Quantity = 300,
                    Description = "Helt rak"
                },
                new Product {
                    Name = "Såg", Category = c21,
                    Price = 300, Quantity = 120,
                    Description = "ganska taggig"
                },
                new Product {
                    Name = "Sommar Klänning",  Category = c3_clothes,
                    Price = 400,  Quantity = 2,
                    Description = "Prasslande i lätt material."
                },
                new Product {
                    Name = "Party Tröjan",  Category = c31,
                    Price = 150,  Quantity = 10,
                    Description = "Mjuk och sövande tröja"
                }
            };

            foreach (Product p in prods)
            {
                p.PictureUrl = getRandomImage();
                _context.Products.Add(p);
            }

            foreach (Product p in GenereateProducts(categories, 500))
            {
                _context.Products.Add(p);
            }

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

            OrderItem order1Item1 = new OrderItem { Order = oder1, Product = prods[0], Price = prods[0].Price, Quantity = 1 };
            OrderItem order1Item2 = new OrderItem { Order = oder1, Product = prods[1], Price = prods[1].Price, Quantity = 1 };
            OrderItem order1Item3 = new OrderItem { Order = oder1, Product = prods[2], Price = prods[2].Price * 3, Quantity = 3 }; // hmm 
            OrderItem order2Item1 = new OrderItem { Order = oder2, Product = prods[3], Price = prods[3].Price, Quantity = 1 };
            OrderItem order2Item2 = new OrderItem { Order = oder2, Product = prods[4], Price = prods[4].Price, Quantity = 1 };

            _context.OrderItems.Add(order1Item1);
            _context.OrderItems.Add(order1Item2);
            _context.OrderItems.Add(order1Item3);
            _context.OrderItems.Add(order2Item1);
            _context.OrderItems.Add(order2Item2);
            _context.SaveChanges();
        }

        private List<Product> GenereateProducts(Category[] cats, int nProducts)
        {
            // TODO connced to 4-5 random image links
            Random r = new Random();
            List<Product> products = new List<Product>();
            for (int i = 0; i < nProducts; i++)
            {
                Product prod = new Product()
                {
                    Name = String.Format("prod{0}", i),
                    Description = "det här är bara en dummy",
                    Price = r.Next(10, 1000),
                    Quantity = r.Next(10, 100),
                    Category = cats[r.Next(1, cats.Length)],
                    PictureUrl = getRandomImage()
                };
                products.Add(prod);
            }
            return products;
        }

        private String getRandomImage()
        {
            string[] images = { "mouth_guard.jpg", "syringe.jpg", "handcuffs.jpg", "gasmask.png" };
            Random rand = new Random();
            int index = rand.Next(images.Length);
            return images[index];
        }
    }
}
