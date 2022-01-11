using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
        Task<OrderDto> Create(OrderDto order);
        Task<List<OrderDto>> GetOrdersByUser(); // maybe add status filter
    }

    public class OrderService : IOrderService
    {
        readonly ApplicationDbContext _context;
        readonly IProductsService productsService;
        readonly IAuthenticationService authService;

        public OrderService(ApplicationDbContext context, 
            IProductsService productsService,
            IAuthenticationService authService)
        {
            _context = context;
            this.productsService = productsService;
            this.authService = authService;
        }

        /**
         *  Will strore an order in db
         */
        public async Task<Order> Store(OrderDto orderDto, ApplicationUser customer)
        {
            Order order = new Order() { 
                Customer = customer, // should a customer be an ApplicationUser?
                Date = DateTime.Now
            }; 
            foreach (OrderItemDto itemTdo in orderDto.Items)
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

        // maybe move
        public OrderDto MakeOrderDto(Order order)
        {
            OrderDto orderDto = new OrderDto()
            {
                Id = order.Id
            };
            foreach (OrderItem item in order.OrderItems)
            {
                OrderItemDto itemDto = new OrderItemDto()
                {
                    Id = item.Id,
                    Quantity = item.Quantity,
                    ProductId = item.Product.Id,
                    Price = item.Price,
                };
                orderDto.Items.Add(itemDto);
            }
            return orderDto;
        }

        /**
         * *** WORK IN PROGRESS ***
         * 1: first validate order
         * 2: start transaction
         * 3: store order (store order and orderitems)
         * 4: update inventory
         **/
        public async Task<OrderDto> Create(OrderDto orderDto)
        {
            // TODO make sure orders are validated
            ApplicationUser customer = await authService.GetUser();
            Order order = await Store(orderDto, customer);
            return MakeOrderDto(order);
        }

        public async Task<List<OrderDto>> GetOrdersByUser()
        {
            ApplicationUser customer = await authService.GetUser();

            var selectedOrders = await _context.Orders
                .Where(p => p.Customer.Id == customer.Id)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            List<OrderDto> ordersDto = new List<OrderDto>();
            foreach(var order in selectedOrders)
            {
                ordersDto.Add(MakeOrderDto(order));
            }
            return ordersDto;
        }
    }
}
