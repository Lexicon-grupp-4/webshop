using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Data;
using webbshop2.Models;
using webbshop2.Service;

namespace webbshop2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController
    {
        readonly IProductsService _productsService;

        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await _productsService.GetProducts();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _productsService.GetProduct(id);
        }
    }
}
