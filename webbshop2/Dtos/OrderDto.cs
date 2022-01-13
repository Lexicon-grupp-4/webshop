using System;
using System.Collections.Generic;

namespace webbshop2.Dtos
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        public float Price { get; set; }

        // Adding some properties that belongs to a Product
        public string Name { get; set; }
    }

    public class OrderDto
    {
        private List<OrderItemDto> items = new List<OrderItemDto>();
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; } // check time format
        public List<OrderItemDto> Items
        {
            get { return items; }
            set { items = value; }
        }
    }
}
