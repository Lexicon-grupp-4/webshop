using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using webbshop2.Data;
using webbshop2.Models;

namespace webbshop2.Service
{
    public interface IProductsService
    {
        Task<List<Product>> GetProducts();
        Task<Product>  GetProduct(int id);
    }

    public class ProductsService: IProductsService
    {
        readonly ApplicationDbContext _context;

        public ProductsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<List<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
