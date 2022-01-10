using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;
using webbshop2.Authentication;
using webbshop2.Data;
using webbshop2.Dtos;
using webbshop2.Models;

namespace webbshop2.Service
{
    public interface IOrderService
    {
        Task<OrderDto> Create(OrderDto order, IIdentity user);
        Task<List<OrderDto>> GetOrdersByUser(OrderDto order);
    }

    public class OrderService : IOrderService
    {
        readonly ApplicationDbContext _context;
        readonly IProductsService productsService;
        readonly IUserService userService;

        public OrderService(ApplicationDbContext context, 
            IProductsService productsService,
            IUserService userService)
        {
            _context = context;
            this.productsService = productsService;
            this.userService = userService;
        }


        /**
         *  Will strore an order in db
         */
        public async Task<Order> Store(OrderDto orderDto, ApplicationUser user)
        {
            Order order = new Order() { 
                Customer = user, // should a customer be an ApplicationUser?
                Date = DateTime.Now
            }; 
            foreach (OrderItemsDto itemTdo in orderDto.Items)
            {
                Product product = await productsService.GetProduct(itemTdo.Id);
                OrderItem item = new OrderItem()
                {
                    Product = product,
                    Price = product.Price,
                    Quantity = itemTdo.Quantity,
                };
                order.OrderItems.Add(item);
            }
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        /**
         * *** WORK IN PROGRESS ***
         * 1: first validate order
         * 2: start transaction
         * 3: store order (store order and orderitems)
         * 4: update inventory
         **/
        public async Task<OrderDto> Create(OrderDto orderDto, IIdentity identity)
        {
            // TODO maybe identity dont have to come from controller?
            ApplicationUser user = await userService.GetUserByName(identity.Name);
            var order = await Store(orderDto, user);
            return orderDto;
        }

        public Task<List<OrderDto>> GetOrdersByUser(OrderDto order)
        {
            throw new NotImplementedException();
        }
    }
}
