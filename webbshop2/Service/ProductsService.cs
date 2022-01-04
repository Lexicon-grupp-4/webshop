using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Data;
using webbshop2.Models;

namespace webbshop2.Service
{
    public interface IProductsService
    {
        List<Product> GetProducts();
    }

    public class ProductsService: IProductsService
    {
        readonly ApplicationDbContext _context;

        public ProductsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Product> GetProducts()
        {
            return _context.Products.ToList();
        }
    }
}
