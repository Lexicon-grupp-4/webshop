using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using webbshop2.Dtos;
using webbshop2.Service;

namespace webbshop2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController
    {
        readonly IProductsService productsService;

        public ProductsController(IProductsService productsService)
        {
            this.productsService = productsService;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductDto>> Get()
        {
            return await productsService.GetProducts();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            return await productsService.GetProductDto(id);
        }
    }
}
