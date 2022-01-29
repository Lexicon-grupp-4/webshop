using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webbshop2.Dtos;
using webbshop2.Service;

namespace webbshop2.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        readonly IOrderService orderService;

        public OrdersController(IOrderService orderService)
        {
            this.orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> Index(OrderDto order)
        {
            order = await orderService.Create(order);
            return Ok(order);
        }

        [HttpGet("personal-orders")]
        public async Task<IActionResult> GetPersonalOrders()
        {
            var ordersDto = await orderService.GetOrdersByUser();
            return Ok(ordersDto);
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var ordersDto = await orderService.GetOrders();
            return Ok(ordersDto);
        }
    }
}
