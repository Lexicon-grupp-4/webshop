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
        Task<List<ProductDto>> GetProducts(int catId, int pageIdx, string search);
        Task<Product> GetProduct(int id);
        Task<ProductDto> GetProductDto(int id);
        Task<ProductDto> CreateProduct(ProductDto productDto);
    }

    public class ProductsService: IProductsService
    {
        readonly ApplicationDbContext _context;
        readonly ICategoriesService categoriesService;
        readonly int itemsPerLoad = 12; // TODO inject from settings
        readonly string tempDefaultImage = "package.jpg"; 

        public ProductsService(ApplicationDbContext context, ICategoriesService categoriesService)
        {
            _context = context;
            this.categoriesService = categoriesService;
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<List<ProductDto>> GetProducts(int catId, int pageIdx, string search)
        {
            List<Product> products;
            if (catId == 0)
            {
                products = await _context.Products
                    .Where(p => p.Name.Contains(search))
                    .OrderBy(p => p.Id)
                    .Include(p => p.Category)
                    .Skip(pageIdx * itemsPerLoad).Take(itemsPerLoad)
                    .ToListAsync();
            } else
            {
                products = await _context.Products
                    .OrderBy(p => p.Id)
                    .Include(p => p.Category)
                    .Where(c => c.Category.Id == catId || c.Category.Parent.Id == catId)
                    .Skip(pageIdx * itemsPerLoad).Take(itemsPerLoad)
                    .ToListAsync();
            }

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

        public async Task<ProductDto> CreateProduct(ProductDto productDto)
        {
            var category = await categoriesService.FindCategoryById(productDto.CategoryId);
            var prod = new Product()
            {
                Name = productDto.Name,
                Category = category,
                Price = productDto.Price,
                Description = productDto.Description,
                PictureUrl = tempDefaultImage
            };
            _context.Products.Add(prod);
            await _context.SaveChangesAsync();
            return MakeProductDto(prod);
        }
    }
}
