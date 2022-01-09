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

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        /**
         * *** WORK IN PROGRESS ***
         * 1: first validate order
         * 2: start transaction
         * 3: store order (store order and orderitems)
         * 4: update inventory
         **/
        public async Task<OrderDto> Create(OrderDto order)
        {
            Order o = new Order()
            {
                customerId = 100,
                date = DateTime.Now // maybe let db do this
            };
            var result = await _context.Orders.AddAsync(o);
            await _context.SaveChangesAsync();
            order.Id = result.Entity.Id;
            return order;
        }

        public Task<List<OrderDto>> GetOrdersByUser(OrderDto order)
        {
            throw new NotImplementedException();
        }
    }
}
