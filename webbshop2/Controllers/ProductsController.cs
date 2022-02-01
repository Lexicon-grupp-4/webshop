using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using webbshop2.Dtos;
using webbshop2.Service;

namespace webbshop2.Controllers
{
    public class ProdsQuery
    {
        public int CatId { get; set; }
        public int PageIdx { get; set; }
        public string Search { get; set; }
    }

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
        public async Task<IEnumerable<ProductDto>> GetProducts([FromQuery] ProdsQuery prods)
        {
            return await productsService.GetProducts(prods.CatId, prods.PageIdx, prods.Search);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ProductDto> CreateProducts(ProductDto product)
        {
            return await productsService.CreateProduct(product);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            return await productsService.GetProductDto(id);
        }
    }
}
