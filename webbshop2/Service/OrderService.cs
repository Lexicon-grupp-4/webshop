using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Data;
using webbshop2.Dtos;
using webbshop2.Models;

namespace webbshop2.Service
{
    public interface IOrderService
    {
        Task<OrderDto> Create(OrderDto order);
        Task<List<OrderDto>> GetOrdersByUser(OrderDto order);
    }

    public class OrderService : IOrderService
    {
        readonly ApplicationDbContext _context;
        readonly IProductsService productsService;

        public OrderService(ApplicationDbContext context, IProductsService productsService)
        {
            _context = context;
            this.productsService = productsService;
        }

        //private async Task<OrderItem> StoreOrderItem(OrderItem orderItem)
        //{
        //    var item = new OrderItem()
        //    {
        //        Price = orderItem.Price,
        //        Quantity = orderItem.Quantity
        //    };
        //    _context.OrderItems.Add(item);
        //    await _context.SaveChangesAsync();
        //    return item;
        //}


        /**
         *  Will strore an order in db
         */
        public async Task<Order> Store(OrderDto orderDto)
        {
            Order order = new Order();
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
        public async Task<OrderDto> Create(OrderDto orderDto)
        {
            //Order o = new Order()
            //{
            //    customerId = 100,
            //    date = DateTime.Now // maybe let db do this
            //};
            //var result = await _context.Orders.AddAsync(o);
            //await _context.SaveChangesAsync();
            //order.Id = result.Entity.Id;
            var order = await Store(orderDto);
            return orderDto;
        }

        public Task<List<OrderDto>> GetOrdersByUser(OrderDto order)
        {
            throw new NotImplementedException();
        }
    }
}
