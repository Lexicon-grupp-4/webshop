using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Data;
using webbshop2.Dtos;
using webbshop2.Models;

namespace webbshop2.Service
{
    public interface IProductsService
    {
        Task<List<ProductDto>> GetProducts();
        Task<List<ProductDto>> GetProducts(int catId, int pageIdx);
        Task<Product> GetProduct(int id);
        Task<ProductDto> GetProductDto(int id);
    }

    public class ProductsService: IProductsService
    {
        readonly ApplicationDbContext _context;
        readonly int itemsPerLoad = 12; // TODO inject from settings

        public ProductsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<List<ProductDto>> GetProducts(int catId, int pageIdx)
        {
            var products = await _context.Products
                .OrderBy(p => p.Id)
                .Include(p => p.Category)
                .Where(c => c.Category.Id == catId || c.Category.Parent.Id == catId)
                .Skip(pageIdx * itemsPerLoad).Take(itemsPerLoad)
                .ToListAsync();

            return products.ConvertAll(new Converter<Product, ProductDto>(MakeProductDto));
        }

        public async Task<ProductDto> GetProductDto(int id)
        {
            var product = await GetProduct(id);
            return MakeProductDto(product);
        }

        static public ProductDto MakeProductDto(Product product)
        {
            return new ProductDto()
            {
                Id = product.Id,
                Name = product.Name,
                Quantity = product.Quantity,
                Price = product.Price,
                CategoryId = product.Category.Id,
                PictureUrl = product.PictureUrl,
                Description = product.Description
            };
        }

        public async Task<List<ProductDto>> GetProducts()
        {
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            return products.ConvertAll(new Converter<Product, ProductDto>(MakeProductDto));
        }
    }
}
